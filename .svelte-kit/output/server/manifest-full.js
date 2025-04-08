export const manifest = (() => {
function __memo(fn) {
	let value;
	return () => value ??= (value = fn());
}

return {
	appDir: "_app",
	appPath: "_app",
	assets: new Set(["assets/branding/cloud.jpg","assets/branding/donate.jpg","assets/branding/subscribe.png","data/cleaned_security_incidents.csv","data/country_incident_counts.json","data/security_incidents.csv","data/world-110m.json","favicon.ico","pic/1.jpg","pic/Aid-Worker.jpg","svg/image-removebg-preview.svg"]),
	mimeTypes: {".jpg":"image/jpeg",".png":"image/png",".csv":"text/csv",".json":"application/json",".svg":"image/svg+xml"},
	_: {
		client: {start:"_app/immutable/entry/start.CePbSiCe.js",app:"_app/immutable/entry/app.wb1bXzv3.js",imports:["_app/immutable/entry/start.CePbSiCe.js","_app/immutable/chunks/BNDxJFMT.js","_app/immutable/chunks/CFVXtXxR.js","_app/immutable/chunks/77oUnUbj.js","_app/immutable/chunks/CLT4WHbK.js","_app/immutable/chunks/uUo_491z.js","_app/immutable/entry/app.wb1bXzv3.js","_app/immutable/chunks/CFVXtXxR.js","_app/immutable/chunks/BFjOTyUr.js","_app/immutable/chunks/Dsl7IYrX.js","_app/immutable/chunks/77oUnUbj.js","_app/immutable/chunks/CWj6FrbW.js","_app/immutable/chunks/Cjx9aoqd.js","_app/immutable/chunks/BmWFtLKB.js","_app/immutable/chunks/EnqQmAHH.js","_app/immutable/chunks/uUo_491z.js"],stylesheets:[],fonts:[],uses_env_dynamic_public:false},
		nodes: [
			__memo(() => import('./nodes/0.js')),
			__memo(() => import('./nodes/1.js')),
			__memo(() => import('./nodes/2.js')),
			__memo(() => import('./nodes/3.js')),
			__memo(() => import('./nodes/4.js')),
			__memo(() => import('./nodes/5.js')),
			__memo(() => import('./nodes/6.js'))
		],
		routes: [
			{
				id: "/",
				pattern: /^\/$/,
				params: [],
				page: { layouts: [0,], errors: [1,], leaf: 2 },
				endpoint: null
			},
			{
				id: "/demo",
				pattern: /^\/demo\/?$/,
				params: [],
				page: { layouts: [0,], errors: [1,], leaf: 3 },
				endpoint: null
			},
			{
				id: "/demo/elements",
				pattern: /^\/demo\/elements\/?$/,
				params: [],
				page: { layouts: [0,], errors: [1,], leaf: 4 },
				endpoint: null
			},
			{
				id: "/demo/fonts",
				pattern: /^\/demo\/fonts\/?$/,
				params: [],
				page: { layouts: [0,], errors: [1,], leaf: 5 },
				endpoint: null
			},
			{
				id: "/demo/ig-story",
				pattern: /^\/demo\/ig-story\/?$/,
				params: [],
				page: { layouts: [0,], errors: [1,], leaf: 6 },
				endpoint: null
			}
		],
		prerendered_routes: new Set([]),
		matchers: async () => {
			
			return {  };
		},
		server_assets: {}
	}
}
})();
