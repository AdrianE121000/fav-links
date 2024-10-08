import { useParams } from "react-router-dom";
import { Card } from "./Card";
import { useEffect, useRef, useState } from "react";
import { deleteLink, deleteLinkFromGroup, getGroupsLinks } from "../lib/data";
import EditForm from "./EditForm";
import { AddIcon, CloseIcon } from "./Icons";
import { toast } from "sonner";
import { LinksModal } from "./LinksModal";
import { sorted } from "../lib/utils";

export function Groups() {
  const { group_name } = useParams();
  const userId = localStorage.getItem("userID");

  const loading = useRef(true);

  const [userLinks, setUserLinks] = useState([]);
  const [linkToUpadte, setLinkToUpdate] = useState();
  const [showModal, setShowModal] = useState(false);
  const [showLinks, setShowLinks] = useState(false);

  useEffect(() => {
    async function getAllLinks() {
      loading.current = true;
      const data = {
        group_name,
        userId,
      };
      const links = await getGroupsLinks({ data });

      setUserLinks(links);
    }

    getAllLinks();
    loading.current = false;
  }, [group_name, userId, showLinks]);

  const sortedLinks = sorted(userLinks);

  async function onDelete(id) {
    await deleteLink({ id });
    const data = {
      group_name,
      userId,
    };
    const links = await getGroupsLinks({ data });

    setUserLinks(links);

    toast.success("Link deleted");
  }

  function onEdit(id) {
    setShowModal(true);
    setLinkToUpdate(id);
  }

  async function removeLinkFromGroup(id) {
    const link = await deleteLinkFromGroup(id);

    const data = {
      group_name,
      userId,
    };
    const links = await getGroupsLinks({ data });

    setUserLinks(links);

    if (link) toast.success("Link was remove from the group");
  }

  async function addToGroup() {
    setShowLinks(true);
  }

  return (
    <>
      {loading.current ? (
        <div className="flex items-center justify-center h-screen">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-gray-900"></div>
        </div>
      ) : (
        userLinks.length === 0 && (
          <div className="flex justify-center w-3/4 flex-col shadow-sm shadow-white items-center bg-neutral-800 text-white mx-auto p-5 rounded mt-5 sm:w-1/2">
            <h1 className="mx-auto text-3xl font-bold">
              This group not have links yet
            </h1>
          </div>
        )
      )}
      <div className="flex justify-center mt-5">
        <button
          onClick={addToGroup}
          className="flex justify-center items-center font-semibold rounded bg-red-500 text-white text-sm px-1 py-1 hover:bg-red-900 hover:scale-110 transition duration-500 ease-in-out hover:shadow-lg hover:shadow-red-700"
        >
          add link to this group
          <AddIcon />
        </button>
      </div>
      <div className="container mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-1 mt-2">
        {sortedLinks.map((link) => (
          <Card
            key={link.id}
            link={link}
            onEdit={onEdit}
            onDelete={onDelete}
            removeLinkFromGroup={removeLinkFromGroup}
          />
        ))}
      </div>
      {showModal && (
        <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="p-4 rounded-md shadow-lg">
            <EditForm id={linkToUpadte} setShowModal={setShowModal} />
            <button
              onClick={() => setShowModal(false)}
              className="absolute top-1.5 right-2 p-2 text-neutral-600 hover:text-gray-950 focus:outline-none hover:scale-150 transition duration-500 ease-in-out"
            >
              <CloseIcon />
            </button>
          </div>
        </div>
      )}
      {showLinks && <LinksModal setShowLinks={setShowLinks} />}
    </>
  );
}
