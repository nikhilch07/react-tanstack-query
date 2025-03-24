import { createLazyFileRoute } from "@tanstack/react-router";
import { useMutation } from "@tanstack/react-query";
import postContact from "../api/postContact";

export const Route = createLazyFileRoute("/contacts")({
  component: RouteComponent,
});

function RouteComponent() {
  const mutatuion = useMutation({
    mutationFn: function (e) {
      e.preventDefault();
      const formData = new FormData(e.target);
      return postContact(
        formData.get("name"),
        formData.get("email"),
        formData.get("message"),
      );
    },
  });

  return (
    <div className="contact">
      <h2>Contact</h2>
      {mutatuion.isSuccess ? (
        <h3>Thank you for your message!</h3>
      ) : (
        <form onSubmit={mutatuion.mutate}>
          <input placeholder="Name" type="text" name="name" />
          <input placeholder="Email" type="email" name="email" />
          <textarea placeholder="Message" name="message" />
          <button type="submit">Submit</button>
        </form>
      )}
    </div>
  );
}
