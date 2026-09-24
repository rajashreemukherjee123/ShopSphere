// import React from 'react'
// import  * as LottiModule  from 'lottie-react'
// import aiStarAnimation from "../../assets/aiStarAnimation.json";


// const SearchResultLoading = () => {
//     const Lottie = LottiModule.default || LottiModule.Lottie;
//   return (
//     <div style={{
//         display: 'flex',
//         flexDirection: 'column',
//         justifyContent: 'center',
//         alignItems: 'center',
//         minHeight: '300px',
//         width: '100%'
//     }}>
      
//       <Lottie 
//         animationData={aiStarAnimation}
//         loop={true}
//         style={{ height: 120, width:120}}
//       />

//       <h3 style={{
//         color: '#6b7280',
//         marginTop: '10px',
//         fontSize: '16px',
//         fontWeight: '500'
//       }}>
//         AI is finding the best matches for you...
//       </h3>
//     </div>
//   )
// }

// export default SearchResultLoading


import React, { useEffect, useRef } from 'react';
import lottie from 'lottie-web';
import aiStarAnimation from "../../assets/aiStarAnimation.json";

const SearchResultLoading = () => {
  const containerRef = useRef(null);

  useEffect(() => {
    const anim = lottie.loadAnimation({
      container: containerRef.current,
      renderer: 'svg',
      loop: true,
      autoplay: true,
      animationData: aiStarAnimation,
    });

    return () => anim.destroy();
  }, []);

  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      minHeight: '300px',
      width: '100%'
    }}>
      <div ref={containerRef} style={{ height: 120, width: 120 }} />

      <h3 style={{
        color: '#6b7280',
        marginTop: '10px',
        fontSize: '16px',
        fontWeight: '500'
      }}>
        AI is finding the best matches for you...
      </h3>
    </div>
  );
};

export default SearchResultLoading;