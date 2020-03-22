import React from "react";
import Logo from "react-loader-spinner";

const Loader = React.memo(() => {  
  const styles = {
    display: "flex",
    justifyContent: "center",
    alignItems: "center"
  };
  return (
    <div style={styles}>
      <Logo type="Oval" color="cyan" height={75} width={100} />
    </div>
  );
});

export default Loader;