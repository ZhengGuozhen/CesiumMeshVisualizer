var appConfig = {
  BaseURL: "../../",
};
// window.CESIUM_BASE_URL = appConfig.BaseURL + "ThirdParty/Cesium/";
//准备
// @zgz
var homePosition = [114, 30, 300000]; //初始位置
var viewer = null;
var home = Cesium.Cartesian3.fromDegrees(
  homePosition[0],
  homePosition[1],
  homePosition[2]
);

// @zgz
var imageryViewModels = [];
var tiandituyx = new Cesium.ProviderViewModel({
  name: "天地图影像",
  tooltip: "天地图影像及中文标注数据",
  iconUrl: "./sampleData/images/tianditu.jpg",
  creationFunction: function () {
    var mapsources = [];
    var yx = new Cesium.WebMapTileServiceImageryProvider({
      url: "http://t0.tianditu.com/img_w/wmts?service=wmts&request=GetTile&version=1.0.0&LAYER=img&tileMatrixSet=w&TileMatrix={TileMatrix}&TileRow={TileRow}&TileCol={TileCol}&style=default&format=tiles&tk=8b207a527da69c7a32f636801fa194d4",
      layer: "tdtBasicLayer",
      style: "default",
      format: "image/jpeg",
      tileMatrixSetID: "GoogleMapsCompatible",
      show: false,
    });
    var jd = new Cesium.WebMapTileServiceImageryProvider({
      url: "http://t0.tianditu.gov.cn/cia_w/wmts?service=wmts&request=GetTile&version=1.0.0&LAYER=cia&tileMatrixSet=w&TileMatrix={TileMatrix}&TileRow={TileRow}&TileCol={TileCol}&style=default&format=tiles&tk=8b207a527da69c7a32f636801fa194d4",
      layer: "tiandituImgMarker",
      style: "default",
      format: "image/jpeg",
      tileMatrixSetID: "tiandituImgMarker",
      show: true,
      maximumLevel: 16,
    });
    mapsources.push(yx, jd);
    return yx;
    return mapsources;
  },
});
imageryViewModels.push(tiandituyx);
var tianditujd = new Cesium.ProviderViewModel({
  name: "天地图街道",
  tooltip: "天地图街道数据",
  iconUrl: "./sampleData/images/tianditu.jpg",
  creationFunction: function () {
    return new Cesium.WebMapTileServiceImageryProvider({
      url: "http://t0.tianditu.com/vec_w/wmts?service=wmts&request=GetTile&version=1.0.0&LAYER=vec&tileMatrixSet=w&TileMatrix={TileMatrix}&TileRow={TileRow}&TileCol={TileCol}&style=default&format=tiles&tk=8b207a527da69c7a32f636801fa194d4",
      layer: "tdtVecBasicLayer",
      style: "default",
      format: "image/jpeg",
      tileMatrixSetID: "GoogleMapsCompatible",
      show: false,
    });
  },
});
imageryViewModels.push(tianditujd);
var tiandituzj = new Cesium.ProviderViewModel({
  name: "天地图中文标注",
  tooltip: "天地图中文标注数据",
  iconUrl: "./sampleData/images/tianditu.jpg",
  creationFunction: function () {
    return new Cesium.WebMapTileServiceImageryProvider({
      url: "http://t0.tianditu.gov.cn/cia_w/wmts?service=wmts&request=GetTile&version=1.0.0&LAYER=cia&tileMatrixSet=w&TileMatrix={TileMatrix}&TileRow={TileRow}&TileCol={TileCol}&style=default&format=tiles&tk=8b207a527da69c7a32f636801fa194d4",
      layer: "tiandituImgMarker",
      style: "default",
      format: "image/jpeg",
      tileMatrixSetID: "tiandituImgMarker",
      show: true,
      maximumLevel: 16,
    });
  },
});
imageryViewModels.push(tiandituzj);
var tianditugjx = new Cesium.ProviderViewModel({
  name: "天地图国界线",
  tooltip: "天地图国界线数据",
  iconUrl: "./sampleData/images/tianditu.jpg",
  creationFunction: function () {
    return new Cesium.WebMapTileServiceImageryProvider({
      url: "https://t0.tianditu.gov.cn/ibo_w/wmts?service=wmts&request=GetTile&version=1.0.0&LAYER=ibo&tileMatrixSet=w&TileMatrix={TileMatrix}&TileRow={TileRow}&TileCol={TileCol}&style=default&format=tiles&tk=8b207a527da69c7a32f636801fa194d4",
      layer: "tiandituImg",
      style: "default",
      format: "image/jpeg",
      tileMatrixSetID: "tiandituImg",
      show: true,
      maximumLevel: 16,
    });
  },
});
imageryViewModels.push(tianditugjx);

// @zgz
function imageProviderDefault() {
  var mapsources = [];
  var yx = new Cesium.WebMapTileServiceImageryProvider({
    url: "http://t0.tianditu.com/img_w/wmts?service=wmts&request=GetTile&version=1.0.0&LAYER=img&tileMatrixSet=w&TileMatrix={TileMatrix}&TileRow={TileRow}&TileCol={TileCol}&style=default&format=tiles&tk=8b207a527da69c7a32f636801fa194d4",
    layer: "tdtBasicLayer",
    style: "default",
    format: "image/jpeg",
    tileMatrixSetID: "GoogleMapsCompatible",
    show: false,
  });
  var jd = new Cesium.WebMapTileServiceImageryProvider({
    url: "http://t0.tianditu.gov.cn/cia_w/wmts?service=wmts&request=GetTile&version=1.0.0&LAYER=cia&tileMatrixSet=w&TileMatrix={TileMatrix}&TileRow={TileRow}&TileCol={TileCol}&style=default&format=tiles&tk=8b207a527da69c7a32f636801fa194d4",
    layer: "tiandituImgMarker",
    style: "default",
    format: "image/jpeg",
    tileMatrixSetID: "tiandituImgMarker",
    show: true,
    maximumLevel: 16,
  });
  mapsources.push(yx, jd);
  return yx;
  return mapsources;
}

//初始化
function init() {
  if (viewer) {
    return;
  }
  viewer = new Cesium.Viewer("cesiumContainer", {
    animation: false,
    timeline: false,
    creditContainer: "creditContainer",
    // @zgz
    //是否显示图层选择器
    baseLayerPicker: true,
    // 可供BaseLayerPicker选择的图像图层
    imageryProviderViewModels: imageryViewModels,
    // 当前图像图层的显示模型，仅baseLayerPicker设为true有意义
    selectedImageryProviderViewModel: tiandituyx,
    // 可供BaseLayerPicker选择的地形图层
    terrainProviderViewModels: Cesium.createDefaultTerrainProviderViewModels(),
    // 当前地形图层的显示模型，仅baseLayerPicker设为true有意义
    selectedTerrainProviderViewModel: undefined,
    // 图像图层提供者，仅baseLayerPicker设为false有意义
    imageryProvider: imageProviderDefault(),
  });
  if (navigator.userAgent.match(/(iPhone|iPod|Android|ios)/i)) {
    //移动设备上禁掉以下几个选项，可以相对更加流畅
    viewer.scene.fog.enable = false;
    viewer.scene.skyAtmosphere.show = false;
    viewer.scene.fxaa = false;
  }
  viewer.homeButton.viewModel.command.beforeExecute.addEventListener(function (
    evt
  ) {
    look(homePosition[0], homePosition[1], homePosition[2]);
    evt.cancel = true;
  });
  navigationHelpButtonLang();
  //设置操作习惯
  // viewer.scene.screenSpaceCameraController.zoomEventTypes = [Cesium.CameraEventType.WHEEL, Cesium.CameraEventType.PINCH];
  // viewer.scene.screenSpaceCameraController.tiltEventTypes = [Cesium.CameraEventType.PINCH, Cesium.CameraEventType.RIGHT_DRAG];

  // @zgz
  // camera 向东
  // look(homePosition[0], homePosition[1], homePosition[2]);
  // camera 向下
  viewer.camera.flyTo({
    destination: Cesium.Cartesian3.fromDegrees(
      homePosition[0],
      homePosition[1],
      homePosition[2]
    ),
  });

  var imageryProviderViewModels =
    viewer.baseLayerPicker.viewModel.imageryProviderViewModels;
  viewer.baseLayerPicker.viewModel.selectedImagery =
    imageryProviderViewModels[3];
  viewer.extend(Cesium.viewerCesiumInspectorMixin);
  viewer.cesiumInspector.container.style.display = "none";
  viewer.scene.debugShowFramesPerSecond = true;
  document.addEventListener("keydown", function (event) {
    var e = event || window.event || arguments.callee.caller.arguments[0];
    if (e) {
      switch (e.keyCode) {
        case 82: //R键查看地形三角网
          if (viewer.cesiumInspector) {
            viewer.cesiumInspector.viewModel.wireframe =
              !viewer.cesiumInspector.viewModel.wireframe;
          }
          break;
        case 70: //F键查看帧率
          viewer.scene.debugShowFramesPerSecond =
            !viewer.scene.debugShowFramesPerSecond;
          break;
        default:
      }
    }
  });
}
//汉化帮助按钮
function navigationHelpButtonLang() {
  var viewer = this.viewer;
  if (viewer.navigationHelpButton) {
    viewer.navigationHelpButton.viewModel.tooltip = "操作指南";

    var clickHelper =
      viewer.navigationHelpButton.container.getElementsByClassName(
        "cesium-click-navigation-help"
      )[0];
    var touchHelper =
      viewer.navigationHelpButton.container.getElementsByClassName(
        "cesium-touch-navigation-help"
      )[0];

    var button = viewer.navigationHelpButton.container.getElementsByClassName(
      "cesium-navigation-button-right"
    )[0];
    button.innerHTML = button.innerHTML.replace(">Touch", ">手势");
    button = viewer.navigationHelpButton.container.getElementsByClassName(
      "cesium-navigation-button-left"
    )[0];
    button.innerHTML = button.innerHTML.replace(">Mouse", ">鼠标");

    var click_help_pan = clickHelper.getElementsByClassName(
      "cesium-navigation-help-pan"
    )[0];
    click_help_pan.innerHTML = "平移";
    var click_help_pan_details =
      click_help_pan.parentNode.getElementsByClassName(
        "cesium-navigation-help-details"
      )[0];
    click_help_pan_details.innerHTML = "按下左键 + 拖动";

    var click_help_zoom = clickHelper.getElementsByClassName(
      "cesium-navigation-help-zoom"
    )[0];
    click_help_zoom.innerHTML = "旋转";
    click_help_zoom.parentNode.getElementsByClassName(
      "cesium-navigation-help-details"
    )[0].innerHTML = "按下右键+拖动";
    click_help_zoom.parentNode.getElementsByClassName(
      "cesium-navigation-help-details"
    )[1].innerHTML = "";

    var click_help_rotate = clickHelper.getElementsByClassName(
      "cesium-navigation-help-rotate"
    )[0];
    click_help_rotate.innerHTML = "缩放";
    click_help_rotate.parentNode.getElementsByClassName(
      "cesium-navigation-help-details"
    )[0].innerHTML = "滚动鼠标滚轮";
    click_help_rotate.parentNode.getElementsByClassName(
      "cesium-navigation-help-details"
    )[1].innerHTML = "";

    //触屏操作
    var touch_help_pan = touchHelper.getElementsByClassName(
      "cesium-navigation-help-pan"
    )[0];
    touch_help_pan.innerHTML = "平移";
    touch_help_pan.parentNode.getElementsByClassName(
      "cesium-navigation-help-details"
    )[0].innerHTML = "单指拖动";

    var touch_help_zoom = touchHelper.getElementsByClassName(
      "cesium-navigation-help-zoom"
    )[0];
    touch_help_zoom.innerHTML = "缩放";
    touch_help_zoom.parentNode.getElementsByClassName(
      "cesium-navigation-help-details"
    )[0].innerHTML = "双指捏合";

    var touch_help_tilt = touchHelper.getElementsByClassName(
      "cesium-navigation-help-rotate"
    )[0];
    touch_help_tilt.innerHTML = "俯仰";
    touch_help_tilt.parentNode.getElementsByClassName(
      "cesium-navigation-help-details"
    )[0].innerHTML = "双指同向拖动";

    var touch_help_rotate = touchHelper.getElementsByClassName(
      "cesium-navigation-help-tilt"
    )[0];
    touch_help_rotate.innerHTML = "旋转";
    touch_help_rotate.parentNode.getElementsByClassName(
      "cesium-navigation-help-details"
    )[0].innerHTML = "双指反向拖动";
  }
}
function look(lon, lat, offset) {
  if (!viewer) {
    return;
  }
  var center = Cesium.Cartesian3.fromDegrees(lon, lat);
  var transform = Cesium.Transforms.eastNorthUpToFixedFrame(center);

  // View in east-north-up frame
  var camera = viewer.camera;
  camera.constrainedAxis = Cesium.Cartesian3.UNIT_Z;
  camera.lookAtTransform(
    transform,
    new Cesium.Cartesian3(-offset, -offset, offset)
  );
  setTimeout(function () {
    camera.lookAtTransform(Cesium.Matrix4.IDENTITY);
  }, 100);
}
