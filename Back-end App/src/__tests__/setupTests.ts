import('dotenv').then(dotenv => dotenv.config({ path: new URL('../.env.development', import.meta.url) }));