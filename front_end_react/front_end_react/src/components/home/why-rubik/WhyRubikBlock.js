import styled from 'styled-components';
export const WhyRubickBlockContainer = styled.div`
    border-radius: 10px;
    background-color: white;
    height: 400px;
    width: 245px;
    margin-left: 10px;
    padding: 30px;
`
export const ImageIcon = styled.div`
    width: 100%;
    margin-bottom: 20px;
`
export const Image = styled.img`
    &:hover{
        cursor: pointer;
        transform: rotateZ(-200deg) scale(1.1) !important;
    }
`
export const Title = styled.div`
    padding-top: 0px !important;
    height: 70px !important;
    margin-bottom: 10px;
    font-weight: 800;
    font-size: 1.4rem !important;
`
export const Text = styled.div`
    font-size: 0.9rem;

`