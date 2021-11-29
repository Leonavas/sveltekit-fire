<script>
	import '../app.css';
	import { initFirebase } from '$lib';
	import DemoHeader from '$lib/demo/layout/Header.svelte';
	import DemoSidebar from '$lib/demo/layout/Sidebar.svelte';

	//initFirebase();
</script>

<DemoHeader />

<div class="w-full max-w-7xl mx-auto">
	<div class="lg:flex">
		<DemoSidebar />
		

		<div class="min-w-0 w-full flex-auto lg:static lg:max-h-full lg:overflow-visible">
			<div class="w-full flex">
				<div class="min-w-0 flex-auto px-4 sm:px-6 xl:px-8 pt-10 pb-24 lg:pb-16">

					<slot />
				</div>
				<div class="hidden xl:text-sm xl:block flex-none w-64 pl-8 mr-8">
					<div
						class="flex flex-col justify-between overflow-y-auto fixed max-h-(screen-18) pt-10 pb-6
						top-18">
						TABLE OF CONTENTS
					</div>
				</div>
			</div>
		</div>
	</div>
</div>
