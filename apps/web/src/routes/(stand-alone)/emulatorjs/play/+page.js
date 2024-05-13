export const load = async ({ url }) => {
    return {
        game: url.searchParams.get('game') ?? ''
    }
}

export const ssr = false
