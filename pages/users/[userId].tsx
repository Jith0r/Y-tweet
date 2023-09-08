import Header from "@/components/Header";
import PostFeed from "@/components/posts/PostFeed";
import UserBio from "@/components/users/UserBio";
import UserHero from "@/components/users/UserHero";
import useUser from "@/hooks/useUser";
import { useRouter } from "next/router";
import { ClipLoader } from "react-spinners";



const UserView = () => {

    const router = useRouter();
    //Fetch USER
    const { userId } = router.query; // pages/users/[userID].tsx

    const { data: fetchedUser, isLoading } = useUser(userId as string);

    // Temps de chargement des données si on met (true) on peut voir le loading grâce à Cliploader
    if (isLoading || !fetchedUser) {
        return (
            <div className="flex justify-center items-center h-full">
                <ClipLoader color="lightblue" size={80} />
            </div>
        )
    }

    return (
        <>
            <Header showBackArrow label={fetchedUser?.name} />
            <UserHero userId={userId as string} />
            <UserBio userId={userId as string} />
            <PostFeed userId={userId as string} />
        </>
    );
}

export default UserView;
//Page de l'utilisateur