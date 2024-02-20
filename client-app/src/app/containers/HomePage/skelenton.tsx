import { Skeleton } from "@mui/material";

//example usage
export default function Skelenton (){
    const item = null;
    return(
        <>
        {
            item ? (
              <img
                style={{
                  width: 210,
                  height: 118,
                }}
                alt={item.title}
                src={item.src}
              />
            ) : (
              <Skeleton variant="rectangular" width="100%" height="100%" />
            )
        }
        </>
    );
}