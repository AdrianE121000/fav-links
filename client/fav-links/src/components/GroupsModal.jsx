import { useEffect, useRef, useState } from "react";
import { getGroups, insertLinkInGroup } from "../lib/data";
import { toast } from "sonner";
import { AddIcon } from "./Icons";

export function GroupsModal({ link_id, setShowGroups }) {
  const [groups, setGroups] = useState([]);
  const loading = useRef(true);

  const user_id = localStorage.getItem("userID");

  useEffect(() => {
    async function getAllGroups() {
      loading.current = true;
      const allGroups = await getGroups(user_id);

      setGroups(allGroups);
    }

    getAllGroups();
    loading.current = false;
  }, [user_id]);

  async function addLinkToGroup(id) {
    const data = {
      category_id: id,
      link_id,
    };

    const result = await insertLinkInGroup({ data });

    if (result?.error) {
      toast.error("Something went wrong");
    } else {
      toast.success(result?.message);

      setShowGroups(false);
    }
  }

  return (
    <>
      <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center text-white bg-opacity-50 z-50">
        <div className="bg-neutral-800 w-3/4 sm:w-[300px] p-4 rounded-md shadow-sm shadow-white">
          {loading.current ? (
            <div className="flex items-center justify-center">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-gray-900"></div>
            </div>
          ) : groups.length === 0 ? (
            <div className="text-white mb-5">
              There are no groups to add this link to
            </div>
          ) : (
            groups.map((group) => (
              <div
                key={group.id}
                onClick={() => addLinkToGroup(group.id)}
                className="flex justify-between items-center cursor-pointer border border-white w-full rounded-xl my-2"
              >
                <p className="line-clamp-1 max-w-[130px] p-1 text-sm px-5 text-white font-bold hover:scale-110 transition duration-500 ease-out">
                  {group.name}
                </p>
                <AddIcon />
              </div>
            ))
          )}
          <div className="flex justify-end">
            <button
              onClick={(state) => setShowGroups(!state)}
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
