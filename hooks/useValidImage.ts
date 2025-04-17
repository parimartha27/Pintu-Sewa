const isValidImage = (image: string) => {
    const isValidImage =
        typeof image === "string" &&
        (image.startsWith("/") || image.startsWith("http://") || image.startsWith("https://"));

    return isValidImage;
};

export default isValidImage;