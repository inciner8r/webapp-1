import ReviewsContext from "./ReviewsContext";

const ReviewsState = (Props: { children: string | number | boolean | React.ReactElement<any, string | React.JSXElementConstructor<any>> | React.ReactFragment | React.ReactPortal | null | undefined; }) => {
    
    
    return (
        <ReviewsContext.Provider value=''>
            {Props.children}
        </ReviewsContext.Provider>
    )
}

export default ReviewsState;