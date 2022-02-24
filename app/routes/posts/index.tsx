import { Link, useLoaderData } from "remix";


export type Post = { title: string, subtitle: string, slug: string };
export const loader = async (): Promise<Post[]> => {
    return [{
        title: "How I became a god",
        subtitle: "Lowercase G",
        slug: "how-became-god"
    },
    {
        title: "Filing for bankruptcy",
        subtitle: "support me on patreon",
        slug: "file-bankruptcy"
    }];
};

export default function Posts() {
    const data = useLoaderData<Post[]>();

    return (
        <div>
            <h1>Posts</h1>
            <ul>
                {data.map(post => <li key={post.slug}>
                    <Link to={post.slug}>{post.title}</Link>
                    <h6>{post.subtitle}</h6>
                </li>)}
            </ul>
        </div>
    );
}