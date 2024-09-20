import { useState } from "react";
import { updateLink } from "../lib/data";
import { toast } from "sonner";

function EditForm({ id, setShowModal }) {
  const [title, setTitle] = useState("");
  const [url, setUrl] = useState("");
  const [description, setDescription] = useState("");

  async function handleSubmit(e) {
    e.preventDefault();

    const data = {};

    if (title) data.title = title;
    if (url) data.url = url;
    if (description) data.description = description;

    const result = await updateLink({ data, id });

    if (result?.error) {
      toast.error(result.error[0].message);
    } else {
      toast.success("Link updated");
      setShowModal(false);

      return;
    }
  }
  return (
    <>
      <form
        onSubmit={handleSubmit}
        className="bg-neutral-800 text-white shadow-md rounded px-8 pt-6 pb-8 mb-4"
      >
        <h1 className="text-center text-3xl font-bold">Update Link</h1>
        <em>Just fill in the fields you want to change</em>
        <div className="mb-4">
          <label className="block text-sm font-bold mb-2" htmlFor="title">
            Title:
          </label>
          <input
            className="bg-neutral-600 shadow appearance-none border rounded w-full py-2 px-3 leading-tight focus:outline-none focus:shadow-outline"
            id="title"
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-bold mb-2" htmlFor="url">
            URL:
          </label>
          <input
            className="bg-neutral-600 shadow appearance-none border rounded w-full py-2 px-3 leading-tight focus:outline-none focus:shadow-outline"
            id="url"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
          />
        </div>
        <div className="mb-6">
          <label className="block text-sm font-bold mb-2" htmlFor="description">
            Description:
          </label>
          <textarea
            className="resize-none bg-neutral-600 shadow appearance-none border rounded w-full py-2 px-3 leading-tight focus:outline-none focus:shadow-outline"
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>
        <div className="flex items-center justify-between">
          <button
            className="bg-blue-500 hover:bg-blue-700 w-full text-white font-bold py-2 px-4 rounded hover:scale-105 transition duration-500 ease-in-out hover:shadow-lg hover:shadow-blue-700"
            type="submit"
          >
            Accept
          </button>
        </div>
      </form>
    </>
  );
}

export default EditForm;
