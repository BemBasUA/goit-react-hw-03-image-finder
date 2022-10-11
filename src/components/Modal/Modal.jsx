export const Modal = ({ url }) => {
  console.log(url);
  return (
    <div className="overlay">
      <div className="modal">
        <img src={url} alt="" />
      </div>
    </div>
  );
};
