import { useEffect, useState } from "react";
import ActionsSidebar from "../../../shared/components/ActionsSidebar";
import PostCard from "./../../posts/components/PostCard";
import { getSavedPosts } from "../../posts/api/postApi";
import ErrorToast from "../../../shared/components/ErrorToast";
import Header from "../../../shared/components/layout/Header";
import Footer from "../../../shared/components/layout/Footer";
import { CameraOff } from "lucide-react";

const SavedPosts = () => {
  const [savedPosts, setSavedPosts] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSavedPosts = async () => {
      try {
        const { data } = await getSavedPosts();
        setSavedPosts(data.savedPosts);
      } catch (error) {
        ErrorToast(
          error.response.data.message ||
            "there was error while loading saved posts",
        );
      } finally {
        setLoading(false);
      }
    };
    fetchSavedPosts();
  }, []);

  return (
    <div className="flex min-h-dvh flex-col">
      <Header />
      <div className="flex h-full flex-1 justify-center bg-[#F1F1F1] pt-8">
        <main className="mx-4 flex w-300 justify-between gap-4">
          <ActionsSidebar />
          <section className="flex-4 rounded-lg">
            {!loading && savedPosts?.length ? (
              <div>
                {savedPosts?.map((post, i) => (
                  <PostCard
                    post={post}
                    user={post.user}
                    key={i}
                    className="mb-4 bg-white"
                  />
                ))}
              </div>
            ) : (
              <div className="flex h-[60dvh] flex-col items-center justify-center gap-5 rounded-lg bg-white">
                <CameraOff className="size-24 text-neutral-800" />

                <h4 className="font-Poppins-SemiBold text-3xl">
                  You Haven't Saved any Posts yet
                </h4>
              </div>
            )}
          </section>
        </main>
      </div>
      <Footer />
    </div>
  );
};
export default SavedPosts;
