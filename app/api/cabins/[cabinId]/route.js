import { getBookedDatesByCabinId, getCabin } from "@/app/_lib/data-service";

// This is How we can essentially build an API endpoint right from Next.js using a feature called Route Handlers and we can create a route handler by creating yet another convention file caleld route.js. And this route.js can be in any folder that doesn't have page.js yet otherwise it's gonna conflict because we can not send HTML and JSON at the same time.

// *** Now, first of all, creating our own API endpoints in Next.js is not as important anymore as it was previously in the Pages Router, because now, in order to mutate data, we have server actions.

// This route handler need to be called HTTP verb
export async function GET(request, { params }) {
  const { cabinId } = params;

  try {
    const [cabin, bookedDates] = await Promise.all([getCabin(cabinId), getBookedDatesByCabinId(cabinId)]);
    // In order to send back a response or even to check out the request itself, these route handlers use web standard such as Request and Response. (Not next.js feature)
    return Response.json({ cabin, bookedDates });
  } catch (error) {
    return Response.json({ message: "Cabin not found" });
  }
}
