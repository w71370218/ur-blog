import { useRouter } from 'next/router';
import path_text from '../public/path_text.js'
import Link from 'next/link.js'

const Breadcrumb = ({ post, series }) => {
    const generateBreadcrumbs = () => {
        const router = useRouter();
        const asPathWithoutQuery = router.asPath.split("?")[0].split("#")[0];
        const asPathNestedRoutes = asPathWithoutQuery.split("/")
            .filter(v => v.length > 0);

        const crumblist = asPathNestedRoutes.map((subpath, idx) => {
            const href = "/" + asPathNestedRoutes.slice(0, idx + 1).join("/");
            let text = subpath;
            if (path_text[subpath]) {
                text = path_text[subpath];
            }

            if (post && /^-?\d+$/.test(asPathNestedRoutes[idx])) {
                text = post;
            }
            if (series && /^-?\d+$/.test(asPathNestedRoutes[idx])) {
                text = series;
            }
            return { href, text };
        })
        return [{ href: "/", text: "首頁" }, ...crumblist];
    }

    const breadcrumbs = generateBreadcrumbs();

    return (
        <>
            <nav className="mb-3">
                <div>
                    <span className='mx-2 text-secondary'>:::</span>
                    {
                        breadcrumbs.map((breadcrumb, index) => (
                            <span key={index}>
                                {breadcrumbs[index] === breadcrumbs.at(-1) ?
                                    (
                                        <span className="breadcrumb-item active" aria-current="page">
                                            <a >{breadcrumb.text}</a>
                                        </span>
                                    ) :
                                    (
                                        <>
                                            <span className={`breadcrumb-item`}>
                                                <Link href={breadcrumb.href}>
                                                    <a>{breadcrumb.text}</a>
                                                </Link>
                                            </span>
                                            <span className='mx-2 text-secondary'>{`>`}</span>
                                        </>
                                    )
                                }
                            </span>
                        ))
                    }
                </div>
            </nav>
        </>
    )
}

export default Breadcrumb 