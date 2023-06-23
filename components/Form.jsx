import Link from "next/link";

const Form = ({ type,
    post,
    setPost,
    handleSubmit,
    submitting, }) => {
    return (
        <section className="w-full max-w-full flex-col flex-start">
            <h1 className="head_text text-left">
                <span className="blue_gradient ">{type} Post</span>
            </h1>
            <p className="desc text-left max-w-md">
                {type} and share amazing prompts with the world, and let your
                imagination run wild with any AI-powered platform.
            </p>

            <form onSubmit={handleSubmit} className="max-w-2xl w-full mt-10 flex flex-col gap-7 glassmorphism">

                <label>
                    <span className="font-satoshi font-semibold text-base text-gray-700">
                        Your AI Prompt
                    </span>

                    <textarea
                        value={post.prompt}
                        onChange={((e) => setPost({
                            ...post,
                            prompt: e.target.value
                        }))}
                        placeholder="Write your prompt here..."
                        required
                        className="form_textarea"
                    />
                </label>

                <label>
                    <span className="font-satoshi font-semibold text-base text-gray-700">
                        Tag {` `}
                        <span className="font-normal text-sm">(ex: #Product, #Web-Development, #Edditing)</span>
                    </span>

                    <input
                        value={post.tag}
                        onChange={((e) => setPost({
                            ...post,
                            tag: e.target.value
                        }))}
                        placeholder="#tag"
                        required
                        className="form_input"
                    />
                </label>

                <div className="flex-end mx-3 mb-5 gap-4">
                    <Link href={"/"} className="text-sm text-gray-500 py-1.5 px-5 bg-white rounded-full hover:bg-gray-200">
                        Cancel
                    </Link>

                    <button
                        type="submit"
                        disabled={submitting}
                        className="py-1.5 px-5 rounded-full bg-primary-orange text-white text-sm hover:opacity-80"
                    >
                        {submitting ? `${type}...` : type}
                    </button>
                </div>
            </form>
        </section>
    );
}

export default Form;