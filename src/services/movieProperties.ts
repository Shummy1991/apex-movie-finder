export const movieProperties = `
    id
    name
    overview
    socialMedia {
        imdb
    }
    genres {
        ... on Genre {
            name
        }
    }
    score
    img: poster {
        url: custom(size: "w185_and_h278_bestv2")
    }
`;
