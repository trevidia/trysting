import Link from "next/link";
import {getSession} from "next-auth/react";

const Home = () => {
    return (
            <div className={"w-[70%] flex items-center flex-col"}>
                <h2 className={"text-4xl text-center mb-5 font-bold"}>Trysting</h2>
                <p className={"mb-8"}>Trysting is an anonymous messaging site made by Nwaorgu Uchenna Du/204, due to the cmp 421 course,
                    it's made for workers and co-workers to leave critics and reviews for each other to better or improve team work in a company.
                </p>
                <Link href={'/register'}>
                    <div className={"btn mb-3"}>
                        Register
                    </div>
                </Link>
                <Link href={'/login'}>
                    <div className={"btn"}>
                        Sign in
                    </div>
                </Link>
                <div className={'w-full'}>
                    <ins className="adsbygoogle"
                         style={{display: "block"}}
                         data-ad-format="fluid"
                         data-ad-layout-key="-gw-3+1f-3d+2z"
                         data-ad-client="ca-pub-7923069855873137"
                         data-ad-slot="1932226240"></ins>
                </div>
            </div>
    )
}

export default Home

export const getServerSideProps = async ({req}) => {
    const session = await getSession({req})

    if (session !== null){
        return {
            redirect: {
                destination: '/profile',
                permanent: false
            }
        }
    }

    return {
        props: {}
    }
}