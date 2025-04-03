import Spinner from "@/app/_components/Spinner";

// Global loader, this one will actually apply to any page that is in our application. So even if it's some route that is deeply nested, like cabins/test/23

// So basically the way this works is that with the loading file, we can display an instant loading state that will be immediately rendered on the server while the content of a route loads. And so then as soon as that content has been loaded, it will automatically get swapped in once it has arrived.

// Now, behind the scenes, this loading.js file actually activates streaming. So basically this data right here will be streamed from the server to the client automatically and not sent in one go.

export default function Loading() {
  return <Spinner />;
}
