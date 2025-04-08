<script>
	// props 拆开读取
	const props = $props();

	// 正确使用 $state
	let value = $state(props.value ?? 0); // 设置默认值为 0

	const {
		root = null,
		top = 0,
		bottom = 0,
		increments = 100,
		children
	} = props;

	let steps = [];
	let threshold = [];
	let nodes = [];
	let intersectionObservers = [];
	let container;

	function mostInView() {
		let maxRatio = 0;
		let maxIndex = 0;
		for (let i = 0; i < steps.length; i++) {
			if (steps[i] > maxRatio) {
				maxRatio = steps[i];
				maxIndex = i;
			}
		}
		value = maxRatio > 0 ? maxIndex : undefined;
	}

	function createObserver(node, index) {
		const handleIntersect = (e) => {
			const ratio = e[0].intersectionRatio;
			steps[index] = ratio;
			mostInView();
		};

		const marginTop = top * -1;
		const marginBottom = bottom * -1;
		const options = {
			root,
			rootMargin: `${marginTop}px 0px ${marginBottom}px 0px`,
			threshold
		};

		if (intersectionObservers[index]) intersectionObservers[index].disconnect();

		const observer = new IntersectionObserver(handleIntersect, options);
		observer.observe(node);
		intersectionObservers[index] = observer;
	}

	$effect(() => {
		threshold = [];
		for (let i = 0; i <= increments; i++) {
			threshold.push(i / increments);
		}
	});

	$effect(() => {
		if (!container) return;
		nodes = container.querySelectorAll(":scope > *:not(iframe)");
		nodes.forEach((node, i) => createObserver(node, i));
	});
</script>

<div bind:this={container}>
	{@render children?.({ active: $value })}
</div>
