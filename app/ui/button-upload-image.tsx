import { Cloudinary } from "@cloudinary/url-gen/index";

export const ButtonUploadImage = () => {
  const cld = new Cloudinary({
    cloud: {
      cloudName: "biblioApp",
    },
  });

  return <div>ButtonUploadImage</div>;
};
