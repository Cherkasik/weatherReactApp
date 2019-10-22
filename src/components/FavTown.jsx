import React from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';
import InfoBlock from './InfoBlock';
import Preloader from './Preloader';
import { rmFavourite } from '../favourites/actions';
import { getWeatherByName } from '../weather/actions';
import * as weatherSelector from '../weather/selectors';

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  height: 46px;
`;

const TownContainer = styled.div`
  width: 45%;
  margin-bottom: 20px; 
`;

const Name = styled.div`
  font-size: 26pt;
  font-weight: 700;
  color: #71848B;
`;

const Temperature = styled.div`
  font-size: 26pt;
  color: #71848B;
  display: ${props => props.show ? 'inherit' : 'none'};
`;

const Icon = styled.div`
  width: 50px;
  height: 40px;
  float: left;
  border: 3px solid #71848B;
  text-align: center;
  color: #6E8084;
  font-size: 10pt;
  display: ${props => props.show ? 'inherit' : 'none'};
  
  img {
    width: 50px;
    height: 40px;
  }
`;

const Close = styled.button`
  transform: rotate(45deg);
  border: none;
  background-color: #708189;
  color: #ffffff;
  border-radius: 50%;
  padding: 0 14px;
  font-size: 25pt;
`;

class FavTown extends React.Component {
  constructor(props) {
    super(props);
    this.state = { loading: true };
  }

  componentDidMount() {
    this.props.getWeatherByName(
          this.props.name,
          () => this.setState({ loading: false }));
  }

  render() {
    const { weatherArray, name, rmFavourite } = this.props;
    const { loading } = this.state;
    const weather = weatherArray && weatherArray[name];
    return (
      <TownContainer>
        <Header>
          <Name>{name}</Name>
          <Temperature show={!loading}>{weather && Math.round(weather.main.temp - 273)}°C</Temperature>
          <Icon show={!loading}>
            <img src={weather && `https://openweathermap.org/img/w/${weather.weather[0].icon}.png`}  alt="icon"/>
          </Icon>
          <Close onClick={() => rmFavourite(name)}>+</Close>
        </Header>
        {loading
          ? <Preloader small/>
          : <InfoBlock weather={weather} />}
      </TownContainer>
    );
  }
}

const mapStateToProps = state => ({
  weatherArray: weatherSelector.getWeatherNamed(state),
});

const mapDispatchToProps = {
  rmFavourite,
  getWeatherByName,
};

export default connect(mapStateToProps, mapDispatchToProps)(FavTown);
