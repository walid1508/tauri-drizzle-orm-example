# An Example of Using Drizzle ORM with Tauri JS

Inspired by: Huakun Shen's drizzle-sqlite-proxy (https://github.com/HuakunShen/tauri-demo/tree/master/examples/drizzle-sqlite-proxy)

## Steps to run this project locally:

```bash
git clone https://github.com/walid1508/tauri-drizzle-orm-example 
cd tauri-drizzle-orm-example
npm install
npx drizzle-kit generate
```
⚠️ and then code the output of `npx drizzle-kit generate`  ```(e.g : src-tauri/migrations/0000_lying_shadow_king.sql)``` to update the migrations path on src/db/migrations.ts and src-tauri/src/lib.rs


```bash
npm run tauri dev
```
