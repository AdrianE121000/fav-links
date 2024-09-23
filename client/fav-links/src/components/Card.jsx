import { useEffect, useState } from "react";
import { timeAgo } from "../lib/utils";
import { DeleteIcon, EditIcon } from "./Icons";
import { deleteLinkFromGroup } from "../lib/data";
import { toast } from "sonner";
import { GroupsModal } from "./GroupsModal";

export function Card({ link, onDelete, onEdit }) {
  const [groupName, setGroupName] = useState("");
  const [showGroups, setShowGroups] = useState(false);

  useEffect(() => {
    const getGroupName = async () => {
      const res = await fetch(
        `http://localhost:3000/groups/goupname/${link.category_id}`
      );

      if (!res.ok) {
        return;
      } else {
        const result = await res.json();

        setGroupName(result[0].name);
      }
    };

    getGroupName();
  }, [link.category_id]);

  async function removeLinkFromGroup(id) {
    const link = await deleteLinkFromGroup(id);

    if (link) toast.success("Link was remove from the group");
  }

  return (
    <>
      <div
        key={link.id}
        className="bg-neutral-800 flex flex-col h-[180px] justify-between text-white rounded-lg p-2 m-3 shadow-sm shadow-white"
      >
        <a
          href={link.url}
          target="_blank"
          className="text-lg font-bold hover:text-blue-700 line-clamp-3 duration-500 ease-in-out"
        >
          {link.title}
        </a>
        <p className="text-gray-300 line-clamp-2">{link.description}</p>
        <p>{timeAgo(link.created_at)}</p>
        {groupName ? (
          <p>
            group:{"  "}
            <span>
              {" "}
              {groupName}{" "}
              <button
                onClick={() => removeLinkFromGroup(link.id)}
                className="items-center font-semibold rounded bg-red-500 text-white text-xs px-2 py-1 hover:bg-red-900 hover:scale-110 transition duration-500 ease-in-out hover:shadow-lg hover:shadow-red-700"
              >
                Remove
              </button>
            </span>
          </p>
        ) : (
          <span>
            <button
              onClick={() => setShowGroups(true)}
              className="items-center font-semibold rounded bg-blue-500 text-white text-sm px-2 py-1 hover:bg-blue-900 hover:scale-110 transition duration-500 ease-in-out hover:shadow-lg hover:shadow-blue-700"
            >
              Add to a group
            </button>
          </span>
        )}

        <div className="mt-4 flex justify-end items-center gap-1">
          <button
            onClick={() => onEdit(link.id)}
            className="flex gap-2 items-center font-semibold rounded bg-blue-500 text-white text-sm px-2 py-1 hover:bg-blue-900 hover:scale-110 transition duration-500 ease-in-out hover:shadow-lg hover:shadow-blue-700"
          >
            Edit
            <EditIcon />
          </button>
          <button
            onClick={() => onDelete(link.id)}
            className="flex gap-2 items-center font-semibold rounded bg-red-500 text-white text-sm px-2 py-1 hover:bg-red-900 hover:scale-110 transition duration-500 ease-in-out hover:shadow-lg hover:shadow-red-700"
          >
            Delete
            <DeleteIcon />
          </button>
        </div>
      </div>
      {showGroups && (
        <GroupsModal link_id={link.id} setShowGroups={setShowGroups} />
      )}
    </>
  );
}
