module.exports = {
    petstore: {
        output: {
            mode: 'tags-split',
            target: 'src/openapi.ts',
            clean: true,
            schemas: 'src/model',
            client: 'react-query',
            mock: true,
            override: {
                query: {
                    useQuery: true,
                    useInfinite: true,
                    useInfiniteQueryParam: 'nextId',
                    options: {
                        staleTime: 10000,
                    },
                },
            },
        },
        input: {
            target: './openapi.yaml',
        },
    },
};