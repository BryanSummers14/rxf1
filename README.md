# Rxf1

So hopefully this project just kinda gives an overall sense to how I approach reactivity. My last job (Xima) we were working with phone systems (agents taking/making calls and the whole flow of transferring and all that), realtime wallboards, and realtime supervisor views so everything had to be very reactive.

## Things that need to be done to clean up the project

1. Code Organization: It's a pretty flat file structure that could greatly benefit from nx libs to break things out into more composable components.

2. Naming: Wow is some of the naming back and inconsistent. Naming changed slightly as I understood the project, but why did I ever name anything a `SeasonRace`? Also should go back through and customize all the `MrData` to be more unique to the underlying data and why did I prefix the effects with `f1-season`?.

3. There's some code/logic duplication that feels off to me, an easy example would be the back button, but also the pagination logic seems duped a lot and I don't like how many subscriptions it takes.

4. Also duplication of styles, the naming and duplication of styles would definitely need to be dealt with were this going into production.

5. This is more of a generic, but my previous work utilized NGXS, so having not used NGRX since 2018 there have been some pretty significant (but good) changes. I'm sure there's some optimization/cleanup to be done there. But for sure with the file structure, the overall file structure needs work, but the NGRX stuff is just kinda littered in with everything else.

There's probably more, I always like to find ways to improve so if I missed anything please let me know.

## Development server

Run `nx serve rxf1` for a dev server. Navigate to http://localhost:4200/. The app will automatically reload if you change any of the source files.

## Understand this workspace

Run `nx graph` to see a diagram of the dependencies of the projects.

## Remote caching

Run `npx nx connect-to-nx-cloud` to enable [remote caching](https://nx.app) and make CI faster.
