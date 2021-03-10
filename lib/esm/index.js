import { defineComponent, getCurrentInstance, ref, provide, onMounted, pushScopeId, popScopeId, openBlock, createBlock, renderSlot, createVNode, withScopeId, inject } from 'vue';
import mapboxgl, { Marker } from 'mapbox-gl';
import Deferred from 'my-deferred';
import Deferred$1 from 'my-deferred/dist/src';
import 'mapbox-gl/dist/mapbox-gl.css';

const getMapboxOptions = (props, el) => ({
    accessToken: props.accessToken,
    container: props.container || el,
    style: props.mapStyle
});
var mountMap = (props, vmb_map, rootRef) => (() => {
    const element = rootRef.value;
    const mapOptions = getMapboxOptions(props, element);
    const map = new mapboxgl.Map(mapOptions);
    map.on('load', () => {
        vmb_map.resolve(map);
    });
})();

var script$6 = defineComponent({
    name: 'MapboxMap',
    props: {
        accessToken: {
            type: String,
            default: ''
        },
        height: {
            type: String,
            default: '500px'
        },
        width: {
            type: String,
            default: '100%'
        },
        container: {
            type: [Object, String] || String,
            default: ''
        },
        minZoom: {
            type: Number,
            default: 0,
        },
        maxZoom: {
            type: Number,
            default: 22,
        },
        minPitch: {
            type: Number,
            default: 0,
        },
        maxPitch: {
            type: Number,
            default: 60,
        },
        mapStyle: {
            type: [Object, String],
            default: 'mapbox://styles/mapbox/streets-v11'
        },
        hash: {
            type: Boolean,
            default: false,
        },
        interactive: {
            type: Boolean,
            default: true,
        },
        bearingSnap: {
            type: Number,
            default: 7,
        },
        pitchWithRotate: {
            type: Boolean,
            default: true,
        },
        clickTolerance: {
            type: Number,
            default: 3,
        },
        attributionControl: {
            type: Boolean,
            default: true,
        },
        customAttribution: {
            type: Array,
            default: null,
        },
        logoPosition: {
            type: String,
            default: 'bottom-left',
        },
        failIfMajorPerformanceCaveat: {
            type: Boolean,
            default: false,
        },
        preserveDrawingBuffer: {
            type: Boolean,
            default: false,
        },
        antialias: {
            type: Boolean,
            default: false,
        },
        refreshExpiredTiles: {
            type: Boolean,
            default: true,
        },
        maxBounds: {
            type: Array,
            default: undefined,
        },
        scrollZoom: {
            type: [Boolean, Object],
            default: true,
        },
        boxZoom: {
            type: Boolean,
            default: true,
        },
        dragRotate: {
            type: Boolean,
            default: true,
        },
        dragPan: {
            type: [Object, Boolean],
            default: true,
        },
        keyboard: {
            type: Boolean,
            default: true,
        },
        doubleClickZoom: {
            type: Boolean,
            default: true,
        },
        touchZoomRotate: {
            type: [Boolean, Object],
            default: true,
        },
        trackResize: {
            type: Boolean,
            default: true,
        },
        center: {
            type: [Object, Array],
            default: () => [0, 0],
        },
        zoom: {
            type: Number,
            default: 0,
        },
        bearing: {
            type: Number,
            default: 0,
        },
        pitch: {
            type: Number,
            default: 0,
        },
        bounds: {
            type: Array,
            default: undefined,
        },
        fitBoundsOptions: {
            type: Object,
            default: null,
        },
        renderWorldCopies: {
            type: Boolean,
            default: true,
        },
        maxTileCacheSize: {
            type: Number,
            default: null,
        },
        localIdeographFontFamily: {
            type: String,
            default: 'sans-serif',
        },
        transformRequest: {
            type: Function,
            default: null,
        },
        collectResourceTiming: {
            type: Boolean,
            default: false,
        },
        fadeDuration: {
            type: Number,
            default: 300,
        },
        crossSourceCollisions: {
            type: Boolean,
            default: true,
        },
        zoomLogo: {
            type: Number,
            default: 1
        },
        hideAttribution: {
            type: Boolean,
            default: false
        }
    },
    setup: (props, stuff) => {
        console.log('SETUP');
        const instance = getCurrentInstance();
        console.log(_instance);
        console.log(instance);
        const root = ref(null);
        const vmb_map = new Deferred();
        provide('vmb_map', vmb_map);
        onMounted(() => {
            console.log('MOUNTED');
            console.log(getCurrentInstance());
            mapboxgl.accessToken = props.accessToken;
            mountMap(props, vmb_map, root);
        });
        return {
            vmb_map, root
        };
    },
    computed: {
        style() {
            return {
                height: this.height,
                width: this.width,
                '--zoom-logo': this.zoomLogo >= 0.8 ? this.zoomLogo : 1,
                '--display-attrib': this.hideAttribution ? 'none' : 'block'
            };
        }
    }
});

const _withId = /*#__PURE__*/withScopeId("data-v-b7bc1cb2");

pushScopeId("data-v-b7bc1cb2");
const _hoisted_1$1 = { key: 1 };
popScopeId();

const render$6 = /*#__PURE__*/_withId((_ctx, _cache, $props, $setup, $data, $options) => {
  return (openBlock(), createBlock("div", { style: _ctx.style }, [
    (_ctx.vmb_map.isResolved)
      ? (openBlock(), createBlock("div", {
          key: 0,
          ref: "root",
          style: _ctx.style
        }, [
          renderSlot(_ctx.$slots, "default")
        ], 4))
      : (openBlock(), createBlock("div", _hoisted_1$1, [
          renderSlot(_ctx.$slots, "loader", {}, () => [
            createVNode("div", { style: _ctx.style }, null, 4)
          ])
        ]))
  ], 4))
});

function styleInject(css, ref) {
  if ( ref === void 0 ) ref = {};
  var insertAt = ref.insertAt;

  if (!css || typeof document === 'undefined') { return; }

  var head = document.head || document.getElementsByTagName('head')[0];
  var style = document.createElement('style');
  style.type = 'text/css';

  if (insertAt === 'top') {
    if (head.firstChild) {
      head.insertBefore(style, head.firstChild);
    } else {
      head.appendChild(style);
    }
  } else {
    head.appendChild(style);
  }

  if (style.styleSheet) {
    style.styleSheet.cssText = css;
  } else {
    style.appendChild(document.createTextNode(css));
  }
}

var css_248z = "[data-v-b7bc1cb2] .mapboxgl-ctrl-logo {\n  zoom: var(--zoom-logo);\n}\n[data-v-b7bc1cb2] .mapboxgl-ctrl.mapboxgl-ctrl-attrib:last-child {\n  display: var(--display-attrib);\n}";
styleInject(css_248z);

script$6.render = render$6;
script$6.__scopeId = "data-v-b7bc1cb2";

var injectMap = {
    setup() {
        const vmb_map = inject('vmb_map');
        return { vmb_map };
    },
};

const getMarkerOptions = (props) => {
    const { element, offset, anchor, color, draggable, clickTolerance, rotation, rotationAlignment, pitchAlignment, scale } = props;
    return {
        element,
        offset,
        anchor,
        color,
        draggable,
        clickTolerance,
        rotation,
        rotationAlignment,
        pitchAlignment,
        scale
    };
};
var script$5 = defineComponent({
    props: {
        lngLat: {
            // type: Array as () => Array<number>,
            default: () => [0, 0],
        },
        element: {
            type: HTMLElement,
            default: null,
        },
        offset: {
            type: [Array],
            default: () => [0, 0],
        },
        anchor: {
            type: String,
            default: () => 'left',
        },
        color: {
            type: String,
            default: null,
        },
        scale: {
            type: Number,
            default: 1,
        },
        draggable: {
            type: Boolean,
            default: false,
        },
        rotation: {
            type: Number,
            default: 0,
        },
        pitchAlignment: {
            type: String,
            default: 'auto',
        },
        rotationAlignment: {
            type: String,
            default: 'auto',
        },
    },
    setup(props) {
        const { vmb_map } = injectMap.setup();
        const vmb_marker = new Deferred$1();
        const i_lngLat = ref(props.lngLat);
        const i_popups = ref(null);
        provide('vmb_marker', vmb_marker);
        onMounted(() => {
        });
        return { vmb_map, vmb_marker, i_lngLat, i_popups };
    },
    watch: {
        $children(children) {
            console.log('CHILDREN CHANGED');
            console.log(children);
        }
    },
    async mounted() {
        const map = await this.vmb_map.promise;
        const options = getMarkerOptions(this.$props);
        const marker = new Marker(options)
            .setLngLat(this.lngLat);
        // addPopupToMapIfPresent(this, marker);    
        // registerMarkerEvents(marker, this);
        marker.addTo(map);
        this.vmb_marker.resolve(marker);
    }
});

function render$5(_ctx, _cache, $props, $setup, $data, $options) {
  return (openBlock(), createBlock("div", null, [
    renderSlot(_ctx.$slots, "default")
  ]))
}

script$5.render = render$5;

const getNavigationControlOptions = (props) => {
    const { showCompass, showZoom, vizualizePitch } = props;
    return {
        showCompass,
        showZoom,
        vizualizePitch
    };
};
const mountNavigationControl = (nav, vmb_map, position) => (async () => {
    const map = await vmb_map.promise;
    map.addControl(nav, position);
})();

var script$4 = defineComponent({
    props: {
        showCompass: {
            type: Boolean,
            default: true
        },
        showZoom: {
            type: Boolean,
            default: true
        },
        visualizePitch: {
            type: Boolean,
            default: false
        },
        position: {
            type: String,
            default: () => 'top-right'
        }
    },
    setup(props) {
        const vmb_map = inject('vmb_map');
        const navOptions = getNavigationControlOptions(props);
        const vmb_navigationControl = new mapboxgl.NavigationControl(navOptions);
        const position = props.position;
        onMounted(() => {
            mountNavigationControl(vmb_navigationControl, vmb_map, position);
        });
        return {
            vmb_map
        };
    }
});

function render$4(_ctx, _cache, $props, $setup, $data, $options) {
  return (openBlock(), createBlock("div"))
}

script$4.render = render$4;

const parentIsMarker = (instance) => instance.parent.provides.vmb_marker;
const attachToMarker = async (instance, vmb_marker, popup) => {
    if (vmb_marker) {
        const marker = await vmb_marker.promise;
        marker.setPopup(popup);
    }
};
const getPopupOptions = (props) => {
    const { closeButton, closeOnClick, closeOnMove, focusAfterOpen, anchor, offset, className, maxWidth } = props;
    return {
        closeButton,
        closeOnClick,
        closeOnMove,
        focusAfterOpen,
        anchor,
        offset,
        className,
        maxWidth
    };
};
const mountPopup = async (instance, vmb_popup, vmb_marker, vmb_map, content) => {
    const map = await vmb_map.promise;
    const popup = vmb_popup;
    popup.setDOMContent(content.value);
    if (parentIsMarker(instance))
        await attachToMarker(instance, vmb_marker, popup);
    else {
        popup.addTo(map);
    }
};

var script$3 = defineComponent({
    props: {
        lngLat: {
            default: () => [0, 0],
        },
        closeButton: {
            type: Boolean,
            default: false
        },
        closeOnClick: {
            type: Boolean,
            default: true
        },
        closeOnMove: {
            type: Boolean,
            default: false
        },
        anchor: {
            type: String,
            default: undefined
        },
        offset: {
            type: Number,
            default: undefined
        },
        className: {
            type: String
        },
        maxWidth: {
            type: String,
            default: '500px'
        },
        renderless: {
            type: Boolean,
            default: false,
        }
    },
    setup(props) {
        const content = ref(null);
        const defaultContent = ref(null);
        const vmb_marker = inject('vmb_marker');
        const vmb_map = inject('vmb_map');
        const popupOptions = getPopupOptions(props);
        const vmb_popup = new mapboxgl.Popup(popupOptions)
            .setLngLat(props.lngLat);
        onMounted(async () => {
            const instance = getCurrentInstance();
            await mountPopup(instance, vmb_popup, vmb_marker, vmb_map, content);
        });
        return { vmb_marker, vmb_popup, popupOptions, content, defaultContent, vmb_map };
    }
});

const _hoisted_1 = { ref: "content" };

function render$3(_ctx, _cache, $props, $setup, $data, $options) {
  return (openBlock(), createBlock("div", null, [
    createVNode("div", _hoisted_1, [
      renderSlot(_ctx.$slots, "default")
    ], 512)
  ]))
}

script$3.render = render$3;

const getAttributionControlOptions = (props) => {
    const { compact, customAttribution } = props;
    return {
        compact,
        customAttribution
    };
};
const mountAttributionControl = async (vmb_map, vmb_attributionControl) => {
    const map = await vmb_map.promise;
    map.addControl(vmb_attributionControl);
};

var script$2 = defineComponent({
    props: {
        compact: {
            type: Boolean,
            default: false
        },
        customAttribution: {
            type: [String, Array],
            default: undefined
        }
    },
    setup(props) {
        const opts = getAttributionControlOptions(props);
        const vmb_attributionControl = new mapboxgl.AttributionControl(opts);
        const vmb_map = inject('vmb_map');
        onMounted(async () => {
            if (vmb_map)
                mountAttributionControl(vmb_map, vmb_attributionControl);
        });
        return {
            vmb_attributionControl,
            vmb_map
        };
    }
});

function render$2(_ctx, _cache, $props, $setup, $data, $options) {
  return (openBlock(), createBlock("div"))
}

script$2.render = render$2;

const getScaleControlOptions = (props) => {
    const { maxWidth, unit } = props;
    return {
        maxWidth,
        unit
    };
};
const mountScaleControl = async (vmb_map, vmb_scaleControl) => {
    const map = await vmb_map.promise;
    map.addControl(vmb_scaleControl);
};

var script$1 = defineComponent({
    props: {
        maxWidth: {
            type: Number,
            default: 100
        },
        unit: {
            type: String,
            default: 'metric'
        }
    },
    setup(props) {
        const options = getScaleControlOptions(props);
        const vmb_scaleControl = new mapboxgl.ScaleControl(options);
        const vmb_map = inject('vmb_map', null);
        onMounted(async () => {
            if (vmb_map)
                await mountScaleControl(vmb_map, vmb_scaleControl);
        });
        return {
            vmb_scaleControl,
            vmb_map
        };
    }
});

function render$1(_ctx, _cache, $props, $setup, $data, $options) {
  return (openBlock(), createBlock("div"))
}

script$1.render = render$1;

const getGeolocationControlOptions = (props) => {
    const { fitBoundsOptions, positionOptions, showAccuracyCircle, showUserLocation, trackUserLocation } = props;
    return {
        fitBoundsOptions,
        positionOptions,
        showAccuracyCircle,
        showUserLocation,
        trackUserLocation
    };
};

var script = defineComponent({
    props: {
        positionOptions: {
            type: Object,
            default: () => ({ enableHighAccuracy: false, timeout: 6000 })
        },
        fitBoundsOptions: {
            type: Object,
            default: () => ({ maxZoom: 15 })
        },
        trackUserLocation: {
            type: Boolean,
            default: false
        },
        showAccuracyCircle: {
            type: Boolean,
            default: true
        },
        showUserLocation: {
            type: Boolean,
            default: true
        }
    },
    setup(props) {
        const vmb_map = inject('vmb_map');
        const options = getGeolocationControlOptions(props);
        const vmb_geolocationControl = new mapboxgl.GeolocateControl(options);
        onMounted(async () => {
            const map = await vmb_map.promise;
            map.addControl(vmb_geolocationControl);
        });
        return {
            vmb_map,
            vmb_geolocationControl
        };
    }
});

function render(_ctx, _cache, $props, $setup, $data, $options) {
  return (openBlock(), createBlock("div"))
}

script.render = render;

// import MapboxGeocoder from './MapboxGeocoder.vue';
// export default {
//   // MapboxGeocoder,
//   // MapboxImage,
//   // MapboxImages,
//   // MapboxLayer,
//   MapboxMap,
//   MapboxMarker,
//   // MapboxNavigationControl,
//   // MapboxPopup,
//   // MapboxSource,
//   // MapboxGeolocateControl,
//   // TestComponentInject,
//   // TestComponentProvide
// };

var components = /*#__PURE__*/Object.freeze({
  __proto__: null,
  MapboxMap: script$6,
  MapboxMarker: script$5,
  MapboxNavigationControl: script$4,
  MapboxPopup: script$3,
  MapboxAttributionControl: script$2,
  MapboxScaleControl: script$1,
  MapboxGeolocateControl: script
});

// import { VueConstructor } from 'vue';
/**
 * Install all components
 *
 * @param  {Vue}  Vue The Vue object
 * @return {void}
 */
let _instance;
var install = (instance) => {
    _instance = instance;
    Object.keys(components).forEach((name) => {
        instance.component(name, components[name]);
    });
};

export default install;
export { script$2 as MapboxAttributionControl, script as MapboxGeolocateControl, script$6 as MapboxMap, script$5 as MapboxMarker, script$4 as MapboxNavigationControl, script$3 as MapboxPopup, script$1 as MapboxScaleControl };
