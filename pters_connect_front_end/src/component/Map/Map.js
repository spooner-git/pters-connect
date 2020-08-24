import React, { Component } from 'react';
import './Map.css';

// declare var kakao:any;
const kakao = window.kakao
class Map extends Component{

  constructor(){
    super();
    this.map = null;
    this.place = null;
    this.infowindow = null;
    this.map_markers = [];
  }

  state = {
    place:null,
    touching:false,
  }

  componentWillUpdate = ()=>{
    this.draw_kakao_map("#map");
  }

  draw_kakao_map = (install_target)=>{
    if(this.map != null){
      //계속해서 #map에 지도가 쌓이는 것을 방지
      return;
    }
    navigator.geolocation.getCurrentPosition((data)=>{
      this.infowindow = new kakao.maps.InfoWindow({zIndex:1});
      let $map_container = document.querySelector(install_target);
      let X = this.props.locX == null ? data.coords.longitude : this.props.locX;
      let Y = this.props.locY == null ? data.coords.latitude : this.props.locY;

      let map_options = {
          center: new kakao.maps.LatLng(Y, X), //지도 중심 좌표
          level: 6 //지도 레벨 (확대 축소)
      };
      this.map = new kakao.maps.Map($map_container, map_options);
      this.place = new kakao.maps.services.Places();
    },()=>{
      this.infowindow = new kakao.maps.InfoWindow({zIndex:1});
      let $map_container = document.querySelector(install_target);
      let X = this.props.locX == null ? 126.950263528489 : this.props.locX;
      let Y = this.props.locY == null ? 37.499483853924 : this.props.locY;
      let map_options = {
          center: new kakao.maps.LatLng(Y, X), //지도 중심 좌표
          level: 4 //지도 레벨 (확대 축소)
      };
      this.map = new kakao.maps.Map($map_container, map_options);
      this.place = new kakao.maps.services.Places();
    });
  }


  kakao_displayMarker = (place)=>{
      // 마커를 생성하고 지도에 표시합니다
      let marker = new kakao.maps.Marker({
          map: this.map,
          position: new kakao.maps.LatLng(place.y, place.x)
      });
      this.map_markers.push(marker);

      // 마커에 클릭이벤트를 등록합니다
      kakao.maps.event.addListener(marker, 'click', ()=> {
          // 마커를 클릭하면 장소명이 인포윈도우에 표출됩니다
          this.infowindow.setContent('<div style="padding:5px;font-size:12px;">' + place.place_name + '</div>');
          this.infowindow.open(this.map, marker);
      });
  }

  kakao_removeMarkers = ()=>{
      this.map_markers.forEach((el)=>{el.setMap(null);});
      this.map_markers = [];
  }

  render(){
    return (
        <div id="map">
        
        </div>
    );
  }
}

export default Map;
