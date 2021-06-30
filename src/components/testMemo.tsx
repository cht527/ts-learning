import React, { useMemo, useContext } from 'react';

import { SomeContext } from '../App';

interface IProps {
  a: string;
  b: string;
}

interface IChildProps extends IProps {
  data: number;
}

const RenderComponent = React.memo(({ data, a, b }: IChildProps) => {
    console.log('dddd');
    
    return(
        <div>
            <div>{a}</div>
            <div>{b}</div>
            <div>{data}</div>
        </div>
    )
});


function PickContextData(props: IProps) {
  const ctx = useContext(SomeContext);
  const someDataFromContext = useMemo(() =>  ctx.moneyForMe, [ctx]);
  return <RenderComponent data={someDataFromContext.value} {...props} />;
}


export default PickContextData;
