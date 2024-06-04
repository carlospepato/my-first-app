interface Config{
    backendUrl: string;
}

export const config: Config = {
    backendUrl: process.env.BACKEND_URL || 'http://localhost:3333'
}
