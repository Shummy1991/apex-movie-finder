import { CircularProgress, Link } from "@mui/material";
import { useEffect, useState } from "react";

import { searchWiki } from "../../services/searchWiki";

import { IMovieDetailsProps } from "./MovieDetails.models";
import "./MovieDetails.css";

const MovieDetails = ({ movie, handleGetRelatedMovies }: IMovieDetailsProps) => {
    const [description, setDescription] = useState<string | null>(null);
    const [wikiLink, setWikiLink] = useState<string | null>(null);
    
    useEffect(() => {
        const fetchWiki = async () => {
            try {
                const wiki = await searchWiki(movie.name);
                setDescription(wiki.data.extract_html);
                setWikiLink(wiki.data.content_urls[window.innerWidth > 740 ? "desktop" : "mobile"].page);
            } catch {
                setDescription(movie.overview);
            }
        }
        fetchWiki();
    }, [movie]);

    return (
        <div>
            {!description &&
                <div className="wiki-progress">
                    <CircularProgress />
                </div>
            }
            {description && (
                <p dangerouslySetInnerHTML={{ __html: description }} />
            )}
            {wikiLink && (
                <Link href={wikiLink} target="_blank">Wikipedia</Link>
            )}
            {!!description && !!movie.socialMedia?.imdb && (
                <Link href={movie.socialMedia.imdb} target="_blank">IMDB</Link>
            )}
            {" "}
            {!!description && (
                <Link onClick={() => handleGetRelatedMovies(movie.id)} href="#">
                    Related movies
                </Link>
            )}
        </div>
    );
};

export default MovieDetails;
