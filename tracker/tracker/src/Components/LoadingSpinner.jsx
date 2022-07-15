import { Spin } from "antd"

const LoadingSpinner = ({ message, size = "large" }) => {

    return (
        <div style={{
            margin: "20px 0", marginBottom: "20px",
            padding: "30px 50px",
            textAlign: "center",
            background: "rgba(0, 0, 0, 0.6)",
            borderRadius: "4px",
            position: "fixed",
            bottom: 0,
            right: 0,
            width: "100%",
            height: "100%",
            zIndex: 20,
            alignItems: "center",
            justifyContent: "center",
            verticalAlign: "middle"
        }}>
            <Spin size={size} style={{ position: "absolute", top: "50%" }} tip={message} />
        </div>
    )
}
export default LoadingSpinner