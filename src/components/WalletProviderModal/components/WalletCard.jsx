import React from 'react'
import Button from '../../Button'
import Card from '../../Card'
import CardContent from '../../CardContent'
import CardIcon from '../../CardIcon'
import CardTitle from '../../CardTitle'
import Spacer from '../../Spacer'
import styled from "styled-components";


const WalletCard = ({icon, onConnect, title,borderBottom}) => (
    <Card boxShadow="none" border="none" backGround="none">
        <CardContent
            flexDirection='row'
            justifyContent='space-around'
            alignItems='center'
            borderBottom={borderBottom}
            padding='0'
        >
            <StyledFlexItem>
                <CardIcon margin='0'>{icon}</CardIcon>
                <CardTitle text={title} padding='0'/>
            </StyledFlexItem>
            <Spacer/>
            <Button size='sm' width='97' onClick={onConnect} text="Connect"/>
        </CardContent>
    </Card>
)

const StyledFlexItem = styled.div`
  width: 50%;
  flex-direction: row;
  display: flex;
  align-items: center;
`

export default WalletCard
