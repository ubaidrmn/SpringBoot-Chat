const HorizontalAlign = props => {
    return <>
        <div style={{maxWidth:"100%",width:"100%",display:"flex",justifyContent:"center"}}>
            {props.children}
        </div>
    </>
}

export default HorizontalAlign;
