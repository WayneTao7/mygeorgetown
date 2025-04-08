<script>
	import { onMount } from "svelte";
	import * as d3 from "d3";
	import * as topojson from "topojson-client";

	const { dataUrl } = $props();
	let svg;

	onMount(async () => {
		const [topoData, data] = await Promise.all([
			d3.json("/data/world-110m.json"),
			d3.json(dataUrl)
		]);

		const geo = topojson.feature(topoData, topoData.objects.countries);

		const width = 960, height = 500;
		const svgEl = d3.select(svg)
			.attr("width", width)
			.attr("height", height);

		const colorScale = d3.scaleSequentialLog(d3.interpolateReds)
			.domain([1, d3.max(data, d => d["Incident Count"])]);

		const dataMap = new Map(data.map(d => [d.Country, d["Incident Count"]]));

		const projection = d3.geoNaturalEarth1().fitSize([width, height], geo);
		const path = d3.geoPath().projection(projection);

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
	});
</script>

<svg bind:this={svg}></svg>

<style>
	svg {
		display: block;
		margin: 2rem auto;
		max-width: 100%;
	}
</style>
