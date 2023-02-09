import Link from "next/link";
import {getSession} from "next-auth/react";

const Home = () => {
    return (
            <div className={"w-[70%] flex items-center flex-col"}>
                <h2 className={"text-4xl text-center mb-5 font-bold"}>Trysting</h2>
                <p className={"mb-8"}>Trysting is an anonymous messaging site made by your boy trevidia, it's made for you
                    youths to be able to
                    send your nasty ass messages to your damn crushes or enemy's or sneaky links who has multiple
                    partners
                    so y'all should register and get started and stop parading around for something else you don't
                    know</p>
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