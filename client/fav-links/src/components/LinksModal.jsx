import { useEffect, useRef, useState } from "react";
import { getLinks, insertLinkInGroup } from "../lib/data";
import { AddIcon } from "./Icons";
import { useParams } from "react-router-dom";
import { toast } from "sonner";

export function LinksModal({ setShowLinks }) {
  const { group_name } = useParams();
  const [links, setLinks] = useState([]);
  const loading = useRef(true);

  const user_id = localStorage.getItem("userID");

  useEffect(() => {
    async function getAllLinks() {
      loading.current = true;
      const allLinks = await getLinks(user_id);

      const filteredLinks = allLinks.filter((link) => link.category_id == null);

      setLinks(filteredLinks);
    }

    getAllLinks();
    loading.current = false;
  }, [user_id]);

  async function addLinkToGroup(id) {
    const data = {
      group_name,
      link_id: id,
      user_id,
    };

    const result = await insertLinkInGroup({ data });

    if (result?.error) {
      toast.error("Something went wrong");
    } else {
      toast.success(result?.message);

      setShowLinks(false);
    }
  }
  return (
    <>
      <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center text-white bg-opacity-50 z-50">
        <div className="bg-neutral-800 w-3/4 sm:w-[300px] p-4 rounded-md shadow-sm shadow-white">
          {loading.current ? (
            <div className="flex items-center justify-center h-screen">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-gray-900"></div>
            </div>
          ) : links.length === 0 ? (
            <div className="text-white mb-5">
              There are no link to add to this group
            </div>
          ) : (
            links.map((link) => (
              <div
                key={link.id}
                onClick={() => addLinkToGroup(link.id)}
                className="flex justify-between items-center cursor-pointer border border-white w-full rounded-xl my-2"
              >
                <p className="line-clamp-1 max-w-[130px] p-1 text-sm px-5 text-white font-bold hover:scale-110 transition duration-500 ease-out">
                  {link.title}
                </p>
                <AddIcon />
              </div>
            ))
          )}
          <div className="flex justify-end">
            <button
              onClick={(state) => setShowLinks(!state)}
              className="font-semibold rounded bg-blue-500 text-white text-sm px-2 py-1 hover:bg-blue-900 hover:scale-110 transition duration-500 ease-in-out hover:shadow-lg hover:shadow-blue-700"
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
