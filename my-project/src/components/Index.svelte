<script>
	import { onMount } from "svelte";
	import * as d3 from "d3";
	import * as topojson from "topojson-client";

	let data = [];
	let svg;
	let svg2;
	let svg7;
	let svg9;
	let svg11;
	let svg12;
	onMount(async () => {
		// === MAP ===
		const geo = await d3.json('/data/world-110m.json');
		const data = await d3.json('/data/country_incident_counts.json');
		const dataMap = new Map(data.map(d => [d.Country, d["Incident Count"]]));

		const width = 960, height = 500;
		const projection = d3.geoNaturalEarth1().fitSize([width, height], geo);
		const path = d3.geoPath().projection(projection);
		const maxCount = d3.max(data, d => d["Incident Count"]);
		const colorScale = d3.scaleSequentialLog(d3.interpolateReds).domain([1, maxCount || 100]);

		const svgEl = d3.select(svg)
			.attr("width", width)
			.attr("height", height);

		svgEl.selectAll("path")
			.data(geo.features)
			.join("path")
			.attr("d", path)
			.attr("fill", d => {
				const val = dataMap.get(d.properties.name);
				return val ? colorScale(val) : "#ccc";
			})
			.attr("stroke", "#fff")
			.append("title")
			.text(d => `${d.properties.name}: ${dataMap.get(d.properties.name) || 0} incidents`);

		// === CSV TIME SERIES ===
		const csvData = await d3.csv("/data/cleaned_security_incidents.csv", d => ({
			year: +d.Year,
			type: d.Incident,
			victim: d.Victim
		}));

		const margin = { top: 40, right: 30, bottom: 40, left: 60 };

		// === LINE CHART ===
		const counts = d3.rollup(csvData, v => v.length, d => d.year);
		const years = Array.from(counts.keys()).sort();
		const dataset = years.map(year => ({ year, count: counts.get(year) }));

		const x = d3.scaleLinear().domain(d3.extent(dataset, d => d.year)).range([margin.left, width - margin.right]);
		const y = d3.scaleLinear().domain([0, d3.max(dataset, d => d.count)]).nice().range([height - margin.bottom, margin.top]);

		const svg2El = d3.select(svg2).attr("width", width).attr("height", height);
		svg2El.append("g").attr("transform", `translate(0,${height - margin.bottom})`).call(d3.axisBottom(x).ticks(10).tickFormat(d3.format("d")));
		svg2El.append("g").attr("transform", `translate(${margin.left},0)`).call(d3.axisLeft(y));
		svg2El.append("path")
			.datum(dataset)
			.attr("fill", "none")
			.attr("stroke", "#2a5599")
			.attr("stroke-width", 2.5)
			.attr("d", d3.line().x(d => x(d.year)).y(d => y(d.count)));
		svg2El.selectAll("circle")
			.data(dataset)
			.enter()
			.append("circle")
			.attr("cx", d => x(d.year))
			.attr("cy", d => y(d.count))
			.attr("r", 4)
			.attr("fill", "#e45755")
			.append("title")
			.text(d => `${d.year}: ${d.count} attacks`);

// === PAGE 7: Victim Breakdown by Nationality & Org ===
const csv7 = await d3.csv("/data/cleaned_security_incidents.csv", d => {
	return {
		UN: +d["UN"] || 0,
		INGO: +d["INGO"] || 0,
		NNGO: +d["NNGO"] || 0,
		ICRC: +d["ICRC"] || 0,
		NRCS_IFRC: +d["NRCS and IFRC"] || 0,
		Other: +d["Other"] || 0,
		national: +d["Total nationals"] || 0,
		international: +d["Total internationals"] || 0
	};
});

const orgFields7 = ["UN", "INGO", "NNGO", "ICRC", "NRCS_IFRC", "Other"];
const dataByOrg = orgFields7.map(org => {
	let nationals = 0, internationals = 0;
	csv7.forEach(row => {
		if (row[org] > 0) {
			nationals += row.national;
			internationals += row.international;
		}
	});
	return {
		org: org === "NRCS_IFRC" ? "NRCS and IFRC" : org,
		National: nationals,
		International: internationals
	};
});

const natTypes = ["National", "International"];
const margin7 = { top: 40, right: 30, bottom: 60, left: 80 };
const width7 = 960, height7 = 500;

const x7 = d3.scaleBand()
	.domain(dataByOrg.map(d => d.org))
	.range([margin7.left, width7 - margin7.right])
	.padding(0.2);

const y7 = d3.scaleLinear()
	.domain([0, d3.max(dataByOrg, d => d.National + d.International)]).nice()
	.range([height7 - margin7.bottom, margin7.top]);

const color7 = d3.scaleOrdinal()
	.domain(natTypes)
	.range(["#e45756", "#4c78a8"]);

const stack7 = d3.stack().keys(natTypes)(dataByOrg);

const svg7El = d3.select(svg7)
	.attr("width", width7)
	.attr("height", height7);

svg7El.selectAll("*").remove();

svg7El.append("g")
	.attr("transform", `translate(0,${height7 - margin7.bottom})`)
	.call(d3.axisBottom(x7))
	.selectAll("text")
	.attr("transform", "rotate(-30)")
	.style("text-anchor", "end");

svg7El.append("g")
	.attr("transform", `translate(${margin7.left},0)`)
	.call(d3.axisLeft(y7));

	svg7El.selectAll(".layer")
	.data(stack7)
	.join("g")
	.attr("fill", d => color7(d.key))
	.each(function (layerData) {
		d3.select(this)
			.selectAll("rect")
			.data(layerData)
			.join("rect")
			.attr("x", d => x7(d.data.org))
			.attr("y", d => y7(d[1]))
			.attr("height", d => y7(d[0]) - y7(d[1]))
			.attr("width", x7.bandwidth())
			.append("title")
			.text(d => `${layerData.key} staff: ${d[1] - d[0]}`);
	});

// === PAGE 9: Means of Attack Bar Chart ===
const raw9 = await d3.csv("/data/cleaned_security_incidents.csv");
const methodCounts = d3.rollups(raw9, v => v.length, d => d["Means of attack"]);
const data9 = Array.from(methodCounts, ([method, count]) => ({ method, count }))
	.filter(d => d.method && d.method !== "Unknown")
	.sort((a, b) => b.count - a.count);

const margin9 = { top: 20, right: 40, bottom: 40, left: 250 };
const width9 = 960, height9 = 600;

const x9 = d3.scaleLinear()
	.domain([0, d3.max(data9, d => d.count)]).nice()
	.range([margin9.left, width9 - margin9.right]);

const y9 = d3.scaleBand()
	.domain(data9.map(d => d.method))
	.range([margin9.top, height9 - margin9.bottom])
	.padding(0.2);

const svg9El = d3.select("#svg9")
	.attr("width", width9)
	.attr("height", height9);

svg9El.selectAll("*").remove();

svg9El.append("g")
	.attr("transform", `translate(0,${margin9.top})`)
	.call(d3.axisTop(x9).ticks(6))
	.selectAll("text")
	.style("font-size", "12px");

svg9El.append("g")
	.attr("transform", `translate(${margin9.left},0)`)
	.call(d3.axisLeft(y9))
	.selectAll("text")
	.style("font-size", "13px");

svg9El.selectAll("rect")
	.data(data9)
	.join("rect")
	.attr("x", margin9.left)
	.attr("y", d => y9(d.method))
	.attr("width", d => x9(d.count) - margin9.left)
	.attr("height", y9.bandwidth())
	.attr("fill", "#2a5599")
	.on("mousemove", function (event, d) {
		d3.select(this).attr("fill", "#d95f02");
		svg9El.selectAll(".tooltip").data([d]).join("text")
			.attr("class", "tooltip")
			.attr("x", x9(d.count) + 10)
			.attr("y", y9(d.method) + y9.bandwidth() / 2 + 4)
			.text(`${d.method}: ${d.count}`)
			.style("font-size", "13px")
			.style("fill", "#000");
	})
	.on("mouseleave", function () {
		d3.select(this).attr("fill", "#2a5599");
		svg9El.selectAll(".tooltip").remove();
	});

/// === PAGE 11: Waffle Chart for Location of Attack ===
const raw11 = await d3.csv("/data/cleaned_security_incidents.csv");


const locationCounts = d3.rollups(raw11, v => v.length, d => d["Location"]);
const topLocations = Array.from(locationCounts, ([location, count]) => ({ location, count }))
	.filter(d => d.location && d.location !== "Unknown")
	.sort((a, b) => b.count - a.count)
	.slice(0, 5);
const maxCells = 200; 
const total = d3.sum(topLocations, d => d.count);
const totalShown = Math.min(total, maxCells); 

const cellSize = 20;
const columns = 20;
const cellGap = 2;
const rows = Math.ceil(totalShown / columns);
const waffleWidth = columns * (cellSize + cellGap);
const waffleHeight = rows * (cellSize + cellGap);

const waffleColors = d3.scaleOrdinal()
	.domain(topLocations.map(d => d.location))
	.range(d3.schemeSet2);

	let gridData = [];
topLocations.forEach(d => {
	const n = Math.round((d.count / total) * totalShown);
	for (let i = 0; i < n; i++) {
		gridData.push({ category: d.location });
	}
});

const svgWaffle = d3.select("#waffle11")
	.append("svg")
	.attr("width", waffleWidth)
	.attr("height", waffleHeight + 50);

svgWaffle.selectAll("rect")
	.data(gridData)
	.enter()
	.append("rect")
	.attr("width", cellSize)
	.attr("height", cellSize)
	.attr("x", (d, i) => (i % columns) * (cellSize + cellGap))
	.attr("y", (d, i) => Math.floor(i / columns) * (cellSize + cellGap))
	.attr("fill", d => waffleColors(d.category))
	.on("mousemove", function (event, d) {
		d3.select(this).attr("stroke", "#333").attr("stroke-width", 1.5);
		svgWaffle.selectAll(".tooltip").data([d]).join("text")
			.attr("class", "tooltip")
			.attr("x", 10)
			.attr("y", waffleHeight + 30)
			.text(`Location: ${d.category}`)
			.style("font-size", "14px")
			.style("fill", "#000");
	})
	.on("mouseleave", function () {
		d3.select(this).attr("stroke", null);
		svgWaffle.selectAll(".tooltip").remove();
	});

const legend = svgWaffle.selectAll(".legend")
	.data(topLocations)
	.enter()
	.append("g")
	.attr("transform", (d, i) => `translate(${i * 150}, ${waffleHeight + 30})`);

legend.append("rect")
	.attr("width", 15)
	.attr("height", 15)
	.attr("fill", d => waffleColors(d.location));

legend.append("text")
	.attr("x", 20)
	.attr("y", 12)
	.text(d => d.location)
	.style("font-size", "13px")
	.style("fill", "#000");

// === PAGE 12: Average Victims per Incident by Country ===
const raw12 = await d3.csv("/data/cleaned_security_incidents.csv");

const victimsByCountry = d3.rollups(
	raw12,
	v => {
		const total = d3.sum(v, d =>
			(+d["Total killed"] || 0) +
			(+d["Total wounded"] || 0) +
			(+d["Total kidnapped"] || 0)
		);
		const count = v.length;
		return { total, count, avg: total / count };
	},
	d => d["Country"]
);

const data12 = victimsByCountry
	.map(([country, { total, count, avg }]) => ({ country, total, count, avg }))
	.filter(d => d.count > 5) 
	.sort((a, b) => b.avg - a.avg)
	.slice(0, 15); 

const margin12 = { top: 40, right: 40, bottom: 40, left: 180 };
const width12 = 960, height12 = 500;

const x12 = d3.scaleLinear()
	.domain([0, d3.max(data12, d => d.avg)]).nice()
	.range([margin12.left, width12 - margin12.right]);

const y12 = d3.scaleBand()
	.domain(data12.map(d => d.country))
	.range([margin12.top, height12 - margin12.bottom])
	.padding(0.2);

const svg12El = d3.select("#svg12")
	.attr("width", width12)
	.attr("height", height12);

svg12El.selectAll("*").remove();

// Axes
svg12El.append("g")
	.attr("transform", `translate(0,${margin12.top})`)
	.call(d3.axisTop(x12).ticks(6))
	.selectAll("text").style("font-size", "13px");

svg12El.append("g")
	.attr("transform", `translate(${margin12.left},0)`)
	.call(d3.axisLeft(y12))
	.selectAll("text").style("font-size", "13px");

// Bars
svg12El.selectAll("rect")
	.data(data12)
	.join("rect")
	.attr("x", margin12.left)
	.attr("y", d => y12(d.country))
	.attr("width", d => x12(d.avg) - margin12.left)
	.attr("height", y12.bandwidth())
	.attr("fill", "#4c78a8")
	.on("mousemove", function (event, d) {
		d3.select(this).attr("fill", "#2a4d6f");
		svg12El.selectAll(".tooltip").data([d]).join("text")
			.attr("class", "tooltip")
			.attr("x", x12(d.avg) + 10)
			.attr("y", y12(d.country) + y12.bandwidth() / 2 + 5)
			.text(`${d.country}: Avg ${d.avg.toFixed(2)} victims`)
			.style("fill", "#000")
			.style("font-size", "13px");
	})
	.on("mouseleave", function () {
		d3.select(this).attr("fill", "#4c78a8");
		svg12El.selectAll(".tooltip").remove();
	});

			});
</script>



<!-- First page: Title -->
<section class="title-screen">
	<div class="title-container">
		<div class="wordmark">
			<img src="/svg/image-removebg-preview.svg" alt="School Logo" />
		</div>
		<h1 class="art-title">DSAN 2025</h1>
		<p class="art-title1">In the name of aid, between life and death</p>
	</div>
	<a href="#page2" class="scroll-down-hint">
		<span class="scroll-icon">👇</span>
		<span class="scroll-text">Scroll to Begin</span>
	</a>
</section>

<!-- Second page: Narrative -->
<section class="section" id="page2">
	<p class="subtitle">
		In the world's most dangerous regions, aid workers risk their lives, traveling through war and disaster to bring hope and relief to those who need it most. However, they are also frequent targets of violent attacks. According to the Aid Worker Security Database (AWSD), a record 281 aid workers were killed in the line of duty worldwide in 2024.
	</p>
</section>

<!-- Third page: Map -->
<section class="section">
	<h2 class="title">Where Do Most Attacks Occur?</h2>
	<p class="subtitle">
		This global map highlights the countries where aid workers have been most frequently attacked.
	</p>
	<p class="tip">
		Hint: Hover over each country to see the number of incidents.
	</p>
	
	<svg bind:this={svg}></svg>
	<div class="legend">
		<span><span class="legend-box darkest"></span> Highest</span>
		<span><span class="legend-box dark"></span> High</span>
		<span><span class="legend-box medium"></span> Medium</span>
		<span><span class="legend-box light"></span> Low</span>
		<span><span class="legend-box none"></span> No Data</span>
	</div>
	
	<p class="caption">
		Note: This map reflects reported major incidents from the AWSD dataset. Countries with darker shades indicate more incidents. The data may underreport attacks in regions with weak media presence.
	</p>
</section>



<!-- Fourth page: Interpretive Analysis -->
<section class="section">
	<h2 class="title">Where Do Most Attacks Occur?</h2>
	<p class="subtitle">
		The map reveals a disturbing concentration of attacks in a few regions. By far, the most dangerous countries for aid workers are located in Africa and the Middle East.
	</p>
	<p class="body">
		According to the map, countries like South Sudan, the Democratic Republic of the Congo, Somalia, Afghanistan, and Syria reported the highest number of violent incidents against humanitarian personnel in recent years. These regions are characterized by ongoing armed conflict, political instability, and limited rule of law—factors that create hostile conditions not only for civilians but also for those trying to help them.
	</p>
	<p class="body">
		In contrast, large portions of the Americas, Asia, and Europe report relatively few attacks—or none at all. While this doesn't mean aid workers are completely safe in these places, it suggests a correlation between geopolitical instability and aid worker insecurity. 
	</p>
	<p class="body">
		By visualizing these hotspots, we emphasize a sobering truth: the areas that need help most are often the ones where helping is most dangerous. This calls for not only increased protection and planning for humanitarian operations, but also greater international focus on the root causes of these conflicts.
	</p>

<!-- Page 13: Average Victims Per Incident -->
<section class="section">
	<h2 class="title">Different Countries, Different Cost</h2>
	<p class="subtitle">
		This chart shows the average number of victims per attack, by country.
	</p>
	<svg id="svg12"></svg>
	<p class="caption">
		Note: Some countries not only experience frequent attacks but also endure heavier consequences per incident. High averages often reflect complex, violent incidents like bombings or mass shootings.
	</p>
</section>

<!-- Page 14: Interpretive Analysis - Severity of Attacks -->
<section class="section">
	<h2 class="title">Different Countries, Different Cost</h2>
	<p class="subtitle">
		Some countries not only face more attacks—but each attack tends to be more deadly.
	</p>
	<p class="body">
		The chart reveals a troubling reality: while countries like South Sudan and Somalia are frequently listed in attack counts, they also top the list when it comes to the **average number of victims per incident**. In South Sudan, for instance, many assaults involve the mass shooting of entire aid teams. In Somalia and Afghanistan, IED attacks and group kidnappings are common, leading to disproportionately high casualty numbers.
	</p>
	<p class="body">
		This pattern suggests a deeper layer of risk. In these high-threat countries, attackers often use **more coordinated and destructive tactics**—from ambushes on convoys to multi-victim bombings. These aren't isolated random events; they reflect deliberate targeting, often against high-visibility international agencies. It also implies that simply counting incidents misses a crucial dimension of humanitarian risk: the **intensity** of violence.
	</p>
	<p class="body">
		By analyzing per-incident severity, we highlight the urgency for context-specific protections. In places where each attack is devastating, aid missions must consider reducing group exposure, improving threat intelligence, and prioritizing rapid-response protocols. The future of humanitarian aid in these regions depends not only on quantity of response, but on its quality and security depth.
	</p>
</section>


<!-- Fifth Page: Time Evolution of Attacks -->
<section class="section">
	<h2 class="title">How Have Attacks Evolved Over Time?</h2>
	<p class="subtitle">
		This interactive chart shows the number of reported major attacks on aid workers each year over the past two decades.
	</p>
	<svg bind:this={svg2}></svg>
	<p class="caption">
		Note: The line highlights major increases and drops in aid worker incidents over time. Significant spikes often align with known conflicts such as the Syrian Civil War or escalations in Afghanistan.
	</p>
</section>

<!-- Sixth Page: Conclusion on Temporal Trends -->
<section class="section">
	<h2 class="title">How Have Attacks Evolved Over Time?</h2>
	<p class="subtitle">
		The temporal pattern of attacks reveals not just data—but a narrative of escalating danger for aid workers.
	</p>
	<p class="body">
		The line chart shows a troubling long-term escalation of violence against humanitarian workers. While minor fluctuations are expected year to year, the overall trend line clearly slopes upward. Notably, spikes around 2013 and again after 2018 mark periods of intensified conflict. These moments coincide with global events such as the Syrian Civil War, the Taliban resurgence in Afghanistan, and instability across the Sahel. 
	</p>
	<p class="body">
		What’s particularly alarming is the all-time high reached in 2024—with over 350 reported attacks. This is not just a statistical anomaly; it reflects real-world flashpoints like the armed conflict in Sudan, the Gaza humanitarian crisis, and rising insecurity in Haiti. Aid workers are increasingly operating in hostile environments where they are directly targeted.
	</p>
	<p class="body">
		This page isn’t just about counting attacks—it’s about understanding what those numbers signify. The rising trend points to a global system under strain. As international law and humanitarian protections erode, neutral aid missions are being seen less as impartial and more as political targets. This erosion puts both workers and civilians at risk.
	</p>
	<p class="body">
		The data underscores a pressing need: the global community must invest not only in protective infrastructure for NGOs and UN bodies, but also in long-term political solutions that address root causes of instability. Without such action, the numbers on this timeline will continue to climb—and so will the toll on humanitarian lives.
	</p>
</section>

<!-- Seventh Page-->
<section class="section">
	<h2 class="title">Who Gets Targeted Most?</h2>
	<p class="subtitle">This stacked bar chart compares local and international aid workers across different organization types.</p>
	<svg bind:this={svg7}></svg>
	<div class="legend7">
		<div><span class="legend-box" style="background-color:#e45756;"></span> National Staff</div>
		<div><span class="legend-box" style="background-color:#4c78a8;"></span> International Staff</div>
	</div>
	
	<p class="caption">The bars represent the number of victims within each organization, separated by nationality: local vs international.</p>
	<p class="body">
		The data reveals a crucial insight: <strong>local (national) staff face the majority of violence</strong>, especially within national NGOs and even international organizations like the UN or ICRC.
		While international workers are often perceived as higher-value targets, national staff are far more exposed due to their continued presence in high-risk areas even after international evacuations.
	</p>
</section>

<!--Page 8: Interpretation of "Who Gets Targeted Most?"-->
<section class="section">
	<h2 class="title">Who Gets Targeted Most?</h2>
	<p class="subtitle">
		The chart reveals a critical disparity in the risks faced by aid workers across different organizations and nationalities.
	</p>
	<p class="body">
		The data shows that <strong>national staff consistently suffer the majority of attacks</strong>, particularly within local NGOs (NNGOs), but also across international NGOs (INGOs) and UN-affiliated missions. This is especially striking in the case of INGOs, where national staff account for a substantial share of victims—demonstrating their outsized exposure to danger on the ground.
	</p>
	<p class="body">
		While international staff may be viewed as higher-value targets in some contexts, they are generally afforded stronger protection and are more likely to be relocated during escalating crises. In contrast, <strong>national workers remain embedded in local operations</strong>, often without the same evacuation resources or security protocols, which amplifies their vulnerability.
	</p>
	<p class="body">
		This disparity raises important questions about the global humanitarian system’s reliance on national staff to operate in the most dangerous areas. It underscores the need for <strong>greater investment in local staff safety, training, insurance, and post-incident care</strong>. Without such support, the burden of humanitarian risk remains unjustly uneven.
	</p>
</section>

<!-- Page 9: How Are Aid Workers Attacked -->
<section class="section">
	<h2 class="title">How Are Aid Workers Attacked?</h2>
	<p class="subtitle">
		This horizontal bar chart shows the most common methods of attack against aid workers.
	</p>
	<svg id="svg9"></svg>
	<p class="caption">
		Hint: Hover over each bar to see the number of incidents.
	</p>
</section>

<!-- Page 10: Insight Conclusion -->
<section class="section">
	<h2 class="title">What Are the Most Common Forms of Violence?</h2>
	<p class="body">
		The data reveals that <strong>shootings</strong> remain the most common form of attack on aid workers, followed by <strong>kidnappings</strong> and <strong>bodily assaults</strong>. These methods represent targeted, often opportunistic violence—indicating that aid workers are frequently caught in active conflict zones without adequate protective measures.
	</p>
	<p class="body">
		While less frequent, <strong>complex attacks</strong>—those involving combinations of tactics like IEDs, armed assault, and kidnapping—suggest a growing operational sophistication among hostile groups. These incidents are especially concerning as they imply premeditated, coordinated efforts to harm or obstruct humanitarian personnel.
	</p>
	<p class="body">
		The variety of means—from traditional explosives to sexual assault—underscores the diverse dangers aid workers face on the ground. Protection strategies must therefore be tailored not only to the location, but also to the evolving nature of threats in each operational context.
	</p>
</section>

<!-- Page 11: Where Do Attacks Happen? -->
<section class="section">
	<h2 class="title">Where Do Attacks Happen?</h2>
	<p class="subtitle">This waffle chart shows where aid workers are most commonly attacked.</p>
	<div id="waffle11"></div>
	<p class="caption">
		Note: The most dangerous location is often transit—suggesting that the journey between aid sites is more dangerous than the sites themselves.
	</p>
</section>


<!--Page 12-->
<section class="section">
	<h2 class="title">Which Locations Are the Most Dangerous?</h2>
	<p class="body">
		According to the data, <strong>the most dangerous place for aid workers is not the project site, but the road</strong>. Transit routes account for the highest number of attacks, exposing a vulnerability in mobility and logistics.
	</p>
	<p class="body">
		While project sites and offices are also common places for attacks, their numbers are lower—possibly due to better coordination and visibility at fixed locations. Attacks at home, though rarer, point to deeply personal targeting, often in contexts of ongoing threats.
	</p>
	<p class="body">
		This trend highlights the need for enhanced security planning not just at work sites, but during movement between them. Checkpoints, vehicle ambushes, and roadside IEDs present major hazards, and mitigation strategies must adapt accordingly.
	</p>
</section>

<!-- Page 14: Data Limitations -->
<section class="section">
	<h2 class="title">What Don’t We Know?</h2>
	<p class="subtitle">
		Behind every dataset lies uncertainty. This one is no different.
	</p>
	<p class="body">
		While the Aid Worker Security Database (AWSD) is the most comprehensive public record of major attacks on humanitarian personnel, it still reflects significant <strong>gaps in visibility</strong>. Some aid organizations may underreport incidents due to reputational concerns, internal policy, or fear of retaliation. Others may use different classification standards—for example, what one agency labels “armed robbery,” another may count as “abduction.”
	</p>
	<p class="body">
		Many records contain vague or missing information. Fields like location, perpetrator identity, or victim nationality are frequently marked as <strong>“Unknown.”</strong> This isn’t due to negligence, but rather the <strong>chaotic nature of conflict zones</strong>. In some cases, aid workers disappear without trace; in others, no witness survives to provide details.
	</p>
	<p class="body">
		These data limitations don’t invalidate our findings—but they do remind us to interpret them with **humility and caution**. The charts show us what we know. But perhaps more importantly, they hint at what we don't.
	</p>
	<p class="caption" style="font-style: italic; margin-top: 2rem;">
		🕳️ What we can see is already alarming. But what about what we can’t?
	</p>
</section>

<!-- Page 15: Final Summary and Recommendations -->
<section class="section">
	<h2 class="title">Beyond the Data: What Should Be Done?</h2>
	<p class="subtitle">
		The numbers are clear. The path forward demands action.
	</p>
	<p class="body">
		This data story has revealed uncomfortable truths: <strong>Aid workers are being attacked more frequently</strong>, in more diverse locations, using more complex methods. These attacks disproportionately affect <strong>national staff</strong>, who face the greatest risk while receiving the least recognition or protection.
	</p>
	<p class="body">
		We’ve seen how <strong>armed conflict zones like Syria, Afghanistan, and Sudan</strong> are not only hotspots of humanitarian crisis—but also of humanitarian danger. The <strong>means and locations</strong> of attacks suggest that even routine travel or office work can carry lethal risk. And the <strong>gaps in data</strong> highlight how much may still go unseen.
	</p>

	<div class="body" style="max-width: 720px; margin: 1rem auto; text-align: left;">
		<ul>
			<li>🔒 <strong>Improve security protocols</strong> for frontline staff—especially nationals.</li>
			<li>📊 <strong>Standardize reporting practices</strong> across aid organizations.</li>
			<li>🌍 <strong>Strengthen international protections</strong> for humanitarian personnel under international law.</li>
			<li>🕊️ <strong>Address root causes of violence</strong>—because true safety requires peace.</li>
		</ul>
	</div>

	<p class="caption" style="margin-top: 2rem; font-style: italic;">
		Data alone can’t stop the violence. But it can make it visible—and that’s the first step toward change.
	</p>
</section>

<section class="title-screen" style="background-image: url('src/pic/1.jpg');">
	<div class="title-container">
		<h1 class="art-title">Thank You</h1>
		<p class="art-title1">I can't say too much due to regulations, but I really appreciate the hard work of my first year professors and will consider this year's experience as my most precious treasure. The road ahead will be long and tough, but I just want to smile and enjoy the sunshine that georgetown has given me.❥</p>
	</div>
</section>


</section>


<style>
	/* Bounce arrow to scroll */
	.scroll-down-hint {
		position: absolute;
		bottom: 2rem;
		left: 50%;
		transform: translateX(-50%);
		cursor: pointer;
		text-align: center;
		color: white;
		z-index: 10;
		font-size: 1.1rem;
		animation: bounce 1.5s infinite;
		outline: none;
		text-decoration: none;
	}
	.tip {
	font-size: 0.9rem;
	color: #666;
	font-style: italic;
	margin-top: -1rem;
	margin-bottom: 1rem;
}
.legend7 {
	display: flex;
	justify-content: center;
	align-items: center;
	gap: 2rem;
	margin-top: 1rem;
	font-size: 0.95rem;
}

.legend-box {
	width: 18px;
	height: 18px;
	display: inline-block;
	margin-right: 0.4rem;
	border: 1px solid #999;
	vertical-align: middle;
}

	.scroll-icon {
		font-size: 2rem;
		display: block;
	}

	.scroll-text {
		font-size: 0.9rem;
		margin-top: 0.3rem;
		opacity: 0.85;
	}

	@keyframes bounce {
		0%, 100% {
			transform: translate(-50%, 0);
		}
		50% {
			transform: translate(-50%, 8px);
		}
	}

	/* Header box around logo and title */
	.title-container {
		background-color: rgba(0, 0, 0, 0.5);
		padding: 1.5rem 2rem;
		border-radius: 12px;
		backdrop-filter: blur(4px);
		box-shadow: 0 0 20px rgba(0, 0, 0, 0.4);
		display: flex;
		flex-direction: column;
		align-items: center;
		max-width: 90vw;
	}

	/* Background cover image */
	.title-screen {
		height: 100vh;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		text-align: center;
		padding: 2rem;
		background-image: url("src/pic/Aid-Worker.jpg");
		background-size: cover;
		background-position: center;
		background-repeat: no-repeat;
		position: relative;
		color: white;
	}

	.title-screen::before {
		content: "";
		position: absolute;
		inset: 0;
		background-color: rgba(0, 0, 0, 0.5);
		z-index: 0;
	}
	.legend {
	display: flex;
	gap: 1rem;
	justify-content: center;
	align-items: center;
	margin-top: 1.5rem;
	font-size: 0.9rem;
}

.legend-box {
	display: inline-block;
	width: 20px;
	height: 20px;
	border: 1px solid #aaa;
	margin-right: 0.4rem;
	vertical-align: middle;
}

/* Adjust colors to match your d3.interpolateReds() scale */
.legend-box.darkest { background-color: #800026; }
.legend-box.dark    { background-color: #bd0026; }
.legend-box.medium  { background-color: #f03b20; }
.legend-box.light   { background-color: #fd8d3c; }
.legend-box.none    { background-color: #ccc; }

	.title-screen * {
		position: relative;
		z-index: 1;
	}

	/* Logo container */
	.wordmark {
		width: 200px;
		max-width: 100%;
		aspect-ratio: 474 / 428;
		margin: 0 auto;
		padding: 0.5rem 0 0;
		display: flex;
		justify-content: center;
		align-items: center;
	}

	.wordmark img {
		width: 100%;
		height: auto;
		object-fit: contain;
	}

	/* Main headline */
	.art-title {
		font-family: 'Comic Sans MS', 'Chalkboard', cursive;
		font-size: 5rem;
		font-weight: bold;
		color: #ffffff;
		text-shadow:
			-2px -2px 0 #000,
			2px -2px 0 #000,
			-2px 2px 0 #000,
			2px 2px 0 #000;
		margin: 0;
	}
	.art-title1 {
		font-family: 'Comic Sans MS', 'Chalkboard', cursive;
		font-size: 1.5rem;
		font-weight: bold;
		color: #ffffff;
		text-shadow:
			-1px -1px 0 #000,
			1px -1px 0 #000,
			-1px 1px 0 #000,
			1px 1px 0 #000;
		margin: 0;
	}
	/* Subtitle below main title */
	.subtitle {
	font-size: 1.5rem;
	color: #444444;
	margin-top: 1rem;
	font-weight: 500; 
}


	/* Map & content sections */
	.section {
	min-height: 100vh;
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
	padding: 2rem;
	text-align: center;
	background-color: #fdf6e3; /* 🌼 Light beige background */
	color: #333; /* Set text to dark for better contrast */
}


	/* SVG map styling */
	svg {
	width: 100%;
	height: auto;
	max-width: 960px;
	border: 1px solid lightgray;
}

</style>
