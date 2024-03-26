interface Props {
  imageUrl: string;
  width?: string;
  height?: string;
  rest?: any;
}
export const BackgroundImage = (props: Props) => {
  const { imageUrl, width, height, ...rest } = props;
  return (
    <div
      {...rest}
      style={{
        backgroundImage: `url(${imageUrl})`,
        width: width || "50px",
        height: height || "50px",
        backgroundSize: "contain",
        backgroundRepeat: "no-repeat",
        border: "none",
        cursor: "pointer",
      }}
    ></div>
  );
};
