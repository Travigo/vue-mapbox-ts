'use strict';Object.defineProperty(exports,'__esModule',{value:true});var vue=require('vue'),mapboxgl=require('mapbox-gl'),Deferred=require('my-deferred'),Deferred$1=require('my-deferred/dist/src'),randomString=require('crypto-random-string');require('mapbox-gl/dist/mapbox-gl.css');function _interopDefaultLegacy(e){return e&&typeof e==='object'&&'default'in e?e:{'default':e}}var mapboxgl__default=/*#__PURE__*/_interopDefaultLegacy(mapboxgl);var Deferred__default=/*#__PURE__*/_interopDefaultLegacy(Deferred);var Deferred__default$1=/*#__PURE__*/_interopDefaultLegacy(Deferred$1);var randomString__default=/*#__PURE__*/_interopDefaultLegacy(randomString);const getStyle = (props) => vue.ref({
    height: props.height,
    width: props.width,
    '--zoom-logo': props.zoomLogo >= 0.8 ? props.zoomLogo : 1,
});
const getMapStyle = (raw) => raw.includes('/') ? raw : `mapbox://styles/mapbox/${raw}`;
const getMapboxOptions = (props, el) => {
    const { accessToken, container, minZoom, maxZoom, minPitch, maxPitch, hash, interactive, bearingSnap, pitchWithRotate, clickTolerance, attributionControl, customAttribution, logoPosition, failIfMajorPerformanceCaveat, preserveDrawingBuffer, antialias, refreshExpiredTiles, maxBounds, scrollZoom, boxZoom, dragRotate, dragPan, keyboard, doubleClickZoom, touchZoomRotate, trackResize, center, zoom, bearing, pitch, bounds, fitBoundsOptions, renderWorldCopies, maxTileCacheSize, localIdeographFontFamily, transformRequest, collectResourceTiming, fadeDuration, crossSourceCollisions, } = props;
    const style = getMapStyle(props.mapStyle);
    return {
        accessToken,
        container: container || el,
        minZoom,
        maxZoom,
        minPitch,
        maxPitch,
        style,
        hash,
        interactive,
        bearingSnap,
        pitchWithRotate,
        clickTolerance,
        attributionControl,
        customAttribution,
        logoPosition,
        failIfMajorPerformanceCaveat,
        preserveDrawingBuffer,
        antialias,
        refreshExpiredTiles,
        maxBounds,
        scrollZoom,
        boxZoom,
        dragRotate,
        dragPan,
        keyboard,
        doubleClickZoom,
        touchZoomRotate,
        trackResize,
        center,
        zoom,
        bearing,
        pitch,
        bounds,
        fitBoundsOptions,
        renderWorldCopies,
        maxTileCacheSize,
        localIdeographFontFamily,
        transformRequest,
        collectResourceTiming,
        fadeDuration,
        crossSourceCollisions,
    };
};
const mountMap = (props, vmb_map, rootRef) => (() => {
    const element = rootRef.value;
    const mapOptions = getMapboxOptions(props, element);
    const map = new mapboxgl__default['default'].Map(mapOptions);
    map.on('load', () => {
        vmb_map.resolve(map);
    });
})();var script$c = vue.defineComponent({
    name: 'MapboxMap',
    props: {
        accessToken: {
            type: String,
            default: undefined
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
    },
    setup: (props) => {
        const root = vue.ref(null);
        const vmb_map = new Deferred__default['default']();
        vue.provide('vmb_map', vmb_map);
        const style = getStyle(props);
        vue.onMounted(() => {
            mapboxgl__default['default'].accessToken = props.accessToken;
            mountMap(props, vmb_map, root);
        });
        return {
            vmb_map, root, style
        };
    },
});const _withId = /*#__PURE__*/vue.withScopeId("data-v-4b862892");

vue.pushScopeId("data-v-4b862892");
const _hoisted_1$7 = { key: 1 };
vue.popScopeId();

const render$c = /*#__PURE__*/_withId((_ctx, _cache, $props, $setup, $data, $options) => {
  return (vue.openBlock(), vue.createBlock("div", { style: _ctx.style }, [
    (_ctx.vmb_map.isResolved)
      ? (vue.openBlock(), vue.createBlock("div", {
          key: 0,
          ref: "root",
          style: _ctx.style
        }, [
          vue.renderSlot(_ctx.$slots, "default")
        ], 4))
      : (vue.openBlock(), vue.createBlock("div", _hoisted_1$7, [
          vue.renderSlot(_ctx.$slots, "loader", {}, () => [
            vue.createVNode("div", { style: _ctx.style }, null, 4)
          ])
        ]))
  ], 4))
});function styleInject(css, ref) {
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
}var css_248z = "[data-v-4b862892] .mapboxgl-ctrl-logo {\n  zoom: var(--zoom-logo);\n}";
styleInject(css_248z);script$c.render = render$c;
script$c.__scopeId = "data-v-4b862892";var injectMap = {
    setup() {
        const vmb_map = vue.inject('vmb_map');
        return { vmb_map };
    },
};const slotIsNotEmpty = (el) => el && el.outerHTML !== '<div></div>';
const parentsNameIs = (instance, parentName) => {
    if (!instance.parent)
        return false;
    return instance.parent.type.name === parentName;
};
const parentNameContains = (instance, parentNameFragment) => {
    if (!instance.parent)
        return false;
    return instance.parent.type.name.includes(parentNameFragment);
};const parentIsMarker = (instance) => parentsNameIs(instance, 'MapboxMarker');
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
const registerMarkerEvents = (marker, component) => {
    marker.on('drag', (evt) => {
        const { lng, lat } = evt.target._lngLat;
        component._lngLat = [lng, lat];
        component.emit('drag', evt);
    });
    marker.on('dragend', (evt) => {
        component.emit('dragend', evt);
    });
    marker.on('dragstart', (evt) => {
        component.emit('dragstart', evt);
    });
    marker.getElement().addEventListener('click', _ev => {
        component.emit('click', marker);
    });
};
const mountMarker = (options, vmb_map, vmb_marker, instance, lngLat, element) => (async () => {
    const map = await vmb_map.promise;
    if (element && slotIsNotEmpty(element.value))
        options.element = element.value;
    const marker = new mapboxgl.Marker(options)
        .setLngLat(lngLat);
    registerMarkerEvents(marker, instance);
    marker.addTo(map);
    vmb_marker.resolve(marker);
})();var script$b = vue.defineComponent({
    name: 'MapboxMarker',
    props: {
        lngLat: {
            // type: Array as () => Array<number>,
            default: () => [0, 0],
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
        const vmb_marker = new Deferred__default$1['default']();
        const i_lngLat = vue.ref(props.lngLat);
        const i_popups = vue.ref(null);
        const icon = vue.ref(null);
        const options = getMarkerOptions(props);
        vue.provide('vmb_marker', vmb_marker);
        vue.onMounted(async () => {
            const instance = vue.getCurrentInstance();
            if (instance)
                await mountMarker(options, vmb_map, vmb_marker, instance, i_lngLat.value, icon);
        });
        return { vmb_map, vmb_marker, i_lngLat, i_popups, options, icon };
    },
    watch: {
        $children(children) {
            console.log('CHILDREN CHANGED');
            console.log(children);
        }
    },
});const _hoisted_1$6 = { ref: "icon" };

function render$b(_ctx, _cache, $props, $setup, $data, $options) {
  return (vue.openBlock(), vue.createBlock("div", null, [
    vue.createVNode("div", _hoisted_1$6, [
      vue.renderSlot(_ctx.$slots, "icon")
    ], 512),
    vue.renderSlot(_ctx.$slots, "default")
  ]))
}script$b.render = render$b;const getNavigationControlOptions = (props) => {
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
})();var script$a = vue.defineComponent({
    name: 'MapboxNavigationControl',
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
        const vmb_map = vue.inject('vmb_map');
        const navOptions = getNavigationControlOptions(props);
        const vmb_navigationControl = new mapboxgl__default['default'].NavigationControl(navOptions);
        const position = props.position;
        vue.onMounted(() => {
            mountNavigationControl(vmb_navigationControl, vmb_map, position);
        });
        return {
            vmb_map
        };
    }
});function render$a(_ctx, _cache, $props, $setup, $data, $options) {
  return (vue.openBlock(), vue.createBlock("div"))
}script$a.render = render$a;const parentIsGeogeometry = (instance) => parentNameContains(instance, 'MapboxGeogeometry');
const distanceToLat = (km) => km / 110.574;
const distanceToLong = (km, lat) => km / (Math.cos(lat * Math.PI / 180) * 111.32);const attachToMarker = async (instance, vmb_marker, popup) => {
    if (vmb_marker) {
        const marker = await vmb_marker.promise;
        marker.setPopup(popup);
    }
};
const attachToGeogeometry = async (vmb_map, vmb_geo, popup) => {
    if (vmb_geo) {
        const map = await vmb_map.promise;
        map.on('click', vmb_geo.id, e => {
            const coordinates = vmb_geo.center;
            popup
                .setLngLat(coordinates)
                .addTo(map);
        });
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
const mountPopup = async (
// instance: ComponentInternalInstance | null,
instance, vmb_map, vmb_popup, vmb_marker, vmb_geogeometry, content) => {
    const map = await vmb_map.promise;
    const popup = vmb_popup;
    popup.setDOMContent(content.value);
    if (parentIsMarker(instance))
        await attachToMarker(instance, vmb_marker, popup);
    else if (parentIsGeogeometry(instance)) {
        await attachToGeogeometry(vmb_map, vmb_geogeometry, popup);
    }
    else {
        popup.addTo(map);
    }
};var script$9 = vue.defineComponent({
    name: 'MapboxPopup',
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
        const content = vue.ref(null);
        const vmb_map = vue.inject('vmb_map');
        const vmb_marker = vue.inject('vmb_marker', null);
        const vmb_circle = vue.inject('vmb_circle', null);
        const vmb_polygon = vue.inject('vmb_polygon', null);
        const vmb_rectangle = vue.inject('vmb_rectangle', null);
        const vmb_geometry = vmb_circle || vmb_polygon || vmb_rectangle || null;
        const popupOptions = getPopupOptions(props);
        const vmb_popup = new mapboxgl__default['default'].Popup(popupOptions)
            .setLngLat(props.lngLat);
        vue.onMounted(async () => {
            const instance = vue.getCurrentInstance();
            await mountPopup(instance, vmb_map, vmb_popup, vmb_marker, vmb_geometry, content);
        });
        return { vmb_marker, vmb_popup, popupOptions, content, vmb_map };
    }
});const _hoisted_1$5 = { ref: "content" };

function render$9(_ctx, _cache, $props, $setup, $data, $options) {
  return (vue.openBlock(), vue.createBlock("div", _hoisted_1$5, [
    vue.renderSlot(_ctx.$slots, "default")
  ], 512))
}script$9.render = render$9;const getAttributionControlOptions = (props) => {
    const { compact, customAttribution } = props;
    return {
        compact,
        customAttribution
    };
};
const mountAttributionControl = async (vmb_map, vmb_attributionControl) => {
    const map = await vmb_map.promise;
    map.addControl(vmb_attributionControl);
};var script$8 = vue.defineComponent({
    name: 'MapboxAttributionControl',
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
        const vmb_attributionControl = new mapboxgl__default['default'].AttributionControl(opts);
        const vmb_map = vue.inject('vmb_map');
        vue.onMounted(async () => {
            if (vmb_map)
                mountAttributionControl(vmb_map, vmb_attributionControl);
        });
        return {
            vmb_attributionControl,
            vmb_map
        };
    }
});function render$8(_ctx, _cache, $props, $setup, $data, $options) {
  return (vue.openBlock(), vue.createBlock("div"))
}script$8.render = render$8;const getScaleControlOptions = (props) => {
    const { maxWidth, unit } = props;
    return {
        maxWidth,
        unit
    };
};
const mountScaleControl = async (vmb_map, vmb_scaleControl) => {
    const map = await vmb_map.promise;
    map.addControl(vmb_scaleControl);
};var script$7 = vue.defineComponent({
    name: 'MapboxScaleControl',
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
        const vmb_scaleControl = new mapboxgl__default['default'].ScaleControl(options);
        const vmb_map = vue.inject('vmb_map', null);
        vue.onMounted(async () => {
            if (vmb_map)
                await mountScaleControl(vmb_map, vmb_scaleControl);
        });
        return {
            vmb_scaleControl,
            vmb_map
        };
    }
});function render$7(_ctx, _cache, $props, $setup, $data, $options) {
  return (vue.openBlock(), vue.createBlock("div"))
}script$7.render = render$7;const getFullscreenControlOptions = (props) => {
    const { container } = props;
    return { container };
};
const mountFullscreenControl = async (vmb_fullscreenControl, vmb_map) => {
    const map = await vmb_map.promise;
    map.addControl(vmb_fullscreenControl);
};var script$6 = vue.defineComponent({
    name: 'MapboxFullscreenControl',
    props: {
        container: {
            type: Object,
            default: undefined
        }
    },
    setup(props) {
        const vmb_map = vue.inject('vmb_map');
        const options = getFullscreenControlOptions(props);
        const vmb_fullscreenControl = new mapboxgl__default['default'].FullscreenControl(options);
        vue.onMounted(async () => {
            await mountFullscreenControl(vmb_fullscreenControl, vmb_map);
        });
        return {
            vmb_map,
            vmb_fullscreenControl
        };
    }
});function render$6(_ctx, _cache, $props, $setup, $data, $options) {
  return (vue.openBlock(), vue.createBlock("div"))
}script$6.render = render$6;var script$5 = vue.defineComponent({
    name: 'MapboxSourceGeoJson',
    props: {
        container: {
            type: Object,
            default: undefined
        }
    },
    setup(props) {
        const vmb_map = vue.inject('vmb_map');
        new mapboxgl.GeoJSONSource();
        vue.onMounted(async () => {
            const map = await vmb_map.promise;
            map.addSource;
        });
        return {
            vmb_map
        };
    }
});const _hoisted_1$4 = { ref: "features" };

function render$5(_ctx, _cache, $props, $setup, $data, $options) {
  return (vue.openBlock(), vue.createBlock("div", _hoisted_1$4, [
    vue.renderSlot(_ctx.$slots, "default")
  ], 512))
}script$5.render = render$5;const getMapboxIconOptions = (props) => {
    const { pixelRatio, sdf } = props;
    return { pixelRatio, sdf };
};
const mountMapboxIcon = async (icon, vmb_map, vmb_marker, instance) => {
    if (icon.icon.value) {
        await vmb_map.promise;
        if (parentIsMarker(instance))
            return;
    }
};var script$4 = vue.defineComponent({
    name: 'MapboxSourceGeoJson',
    props: {
        pixelRatio: {
            type: Number,
            default: 2
        },
        sdf: {
            type: Boolean,
            default: true
        },
        name: {
            type: String,
            default: () => randomString__default['default']({ length: 10, type: 'alphanumeric' })
        }
    },
    setup(props) {
        const content = vue.ref(null);
        const vmb_map = vue.inject('vmb_map');
        const vmb_marker = vue.inject('vmb_marker', null);
        const vmb_icon = new Deferred__default['default']();
        const options = getMapboxIconOptions(props);
        const icon = {
            name: props.name,
            icon: content,
            options
        };
        vue.onMounted(async () => {
            const instance = vue.getCurrentInstance();
            if (instance) {
                await mountMapboxIcon(icon, vmb_map, vmb_marker, instance);
                vmb_icon.resolve(icon);
            }
        });
        return {
            vmb_map,
            vmb_marker,
            vmb_icon,
            options
        };
    }
});const _hoisted_1$3 = { ref: "content" };

function render$4(_ctx, _cache, $props, $setup, $data, $options) {
  return (vue.openBlock(), vue.createBlock("div", _hoisted_1$3, [
    vue.renderSlot(_ctx.$slots, "default")
  ], 512))
}script$4.render = render$4;const getGeolocationControlOptions = (props) => {
    const { fitBoundsOptions, positionOptions, showAccuracyCircle, showUserLocation, trackUserLocation } = props;
    return {
        fitBoundsOptions,
        positionOptions,
        showAccuracyCircle,
        showUserLocation,
        trackUserLocation
    };
};var script$3 = vue.defineComponent({
    name: 'MapboxGeolocateControl',
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
        const vmb_map = vue.inject('vmb_map');
        const options = getGeolocationControlOptions(props);
        const vmb_geolocationControl = new mapboxgl__default['default'].GeolocateControl(options);
        vue.onMounted(async () => {
            const map = await vmb_map.promise;
            map.addControl(vmb_geolocationControl);
        });
        return {
            vmb_map,
            vmb_geolocationControl
        };
    }
});function render$3(_ctx, _cache, $props, $setup, $data, $options) {
  return (vue.openBlock(), vue.createBlock("div"))
}script$3.render = render$3;class Geogeometry {
    constructor(input) {
        this.id = input.id;
        this.fillColor = input.fillColor || '#3FB1CE';
        this.antialias = typeof input.antialias === 'boolean' ? input.antialias : true;
        this.opacity = typeof input.opacity === 'number' ? input.opacity : 0.6;
        if (input.outlineColor)
            this.outlineColor = input.outlineColor;
    }
    updateOptions(input) {
        if (input.fillColor)
            this.fillColor = input.fillColor;
        if (typeof input.antialias === 'boolean')
            this.antialias = input.antialias;
        if (typeof input.opacity === 'number')
            this.opacity = input.opacity;
        if (input.outlineColor)
            this.outlineColor = input.outlineColor;
    }
    getPaint() {
        const paint = {};
        if (this.fillColor)
            paint['fill-color'] = this.fillColor;
        if (this.antialias)
            paint['fill-antialias'] = this.antialias;
        if (this.opacity)
            paint['fill-opacity'] = this.opacity;
        if (this.outlineColor)
            paint['fill-outline-color'] = this.outlineColor;
        return paint;
    }
}class Circle extends Geogeometry {
    constructor(input) {
        super(input);
        this.edges = input.edges || 10;
        this.radius = input.radius;
        this.center = input.center;
    }
    updateOptions(input) {
        super.updateOptions(input);
        if (input.edges)
            this.edges = input.edges;
        if (input.radius)
            this.radius = input.radius;
        if (input.center)
            this.center = input.center;
    }
    getGeoJSON() {
        const points = this.edges;
        const long = distanceToLong(this.radius, this.center[1]);
        const lat = distanceToLat(this.radius);
        const path = [];
        for (let i = 0; i < points; i++) {
            const theta = (i / points) * (2 * Math.PI);
            const x = long * Math.cos(theta);
            const y = lat * Math.sin(theta);
            path.push([this.center[0] + x, this.center[1] + y]);
        }
        return {
            type: 'geojson',
            data: {
                type: 'FeatureCollection',
                features: [{
                        type: 'Feature',
                        geometry: {
                            type: 'Polygon',
                            coordinates: [path]
                        },
                        properties: {}
                    }],
            }
        };
    }
}const removeLayerIfPresent = (id, map) => {
    const layer = map.getLayer(id);
    if (layer)
        map.removeLayer(id);
};const removeSourceIfPresent = (id, map) => {
    const source = map.getSource(id);
    if (source)
        map.removeSource(id);
};const updateCircle = async (vmb_map, vmb_circle) => {
    const map = await vmb_map.promise;
    const circle = vmb_circle;
    removeLayerIfPresent(circle.id, map);
    removeSourceIfPresent(circle.id, map);
    map.addSource(circle.id, circle.getGeoJSON());
    map.addLayer({
        'id': circle.id,
        'type': 'fill',
        'source': circle.id,
        'layout': {},
        'paint': circle.getPaint()
    });
};let circlesAdded = 0;
var script$2 = vue.defineComponent({
    name: 'MapboxGeogeometryCircle',
    props: {
        id: {
            type: String,
            default: `circle-${circlesAdded++}`
        },
        center: {
            type: Array,
            required: true
        },
        radius: {
            type: Number,
            required: true
        },
        edges: {
            type: Number,
            default: 10
        },
        fillColor: {
            type: String,
        },
        outlineColor: {
            type: String,
        },
        opacity: {
            type: Number
        },
        antialias: {
            type: Boolean
        }
    },
    setup(props) {
        const vmb_map = vue.inject('vmb_map');
        const vmb_circle = new Circle({
            id: props.id,
            radius: props.radius,
            center: props.center,
            edges: props.edges,
            fillColor: props.fillColor,
            outlineColor: props.outlineColor,
            opacity: props.opacity,
            antialias: props.antialias
        });
        vue.provide('vmb_circle', vmb_circle);
        vue.onMounted(async () => {
            await updateCircle(vmb_map, vmb_circle);
        });
        vue.watch(props, async () => {
            vmb_circle.updateOptions(props);
            await updateCircle(vmb_map, vmb_circle);
        });
        return {
            vmb_map,
            vmb_circle
        };
    }
});const _hoisted_1$2 = { ref: "features" };

function render$2(_ctx, _cache, $props, $setup, $data, $options) {
  return (vue.openBlock(), vue.createBlock("div", _hoisted_1$2, [
    vue.renderSlot(_ctx.$slots, "default")
  ], 512))
}script$2.render = render$2;class Polygon extends Geogeometry {
    constructor(input) {
        super(input);
        this.path = input.path;
    }
    updateOptions(input) {
        super.updateOptions(input);
        if (input.path)
            this.path = input.path;
    }
    get center() {
        const sum = this.path.reduce((acc, c) => [acc[0] + c[0], acc[1] + c[1]]);
        return [sum[0] / this.path.length, sum[1] / this.path.length];
    }
    getGeoJSON() {
        return {
            type: 'geojson',
            data: {
                type: 'FeatureCollection',
                features: [{
                        type: 'Feature',
                        geometry: {
                            type: 'Polygon',
                            coordinates: [this.path]
                        },
                        properties: {}
                    }],
            }
        };
    }
}const updatePolygon = async (vmb_map, vmb_polygon) => {
    const map = await vmb_map.promise;
    const polygon = vmb_polygon;
    removeLayerIfPresent(polygon.id, map);
    removeSourceIfPresent(polygon.id, map);
    map.addSource(polygon.id, polygon.getGeoJSON());
    map.addLayer({
        'id': polygon.id,
        'type': 'fill',
        'source': polygon.id,
        'layout': {},
        'paint': polygon.getPaint()
    });
};let polygonsAdded$1 = 0;
var script$1 = vue.defineComponent({
    name: 'MapboxGeogeometryPolygon',
    props: {
        id: {
            type: String,
            default: `polygon-${polygonsAdded$1++}`
        },
        path: {
            type: Array,
            required: true
        },
        fillColor: {
            type: String,
        },
        outlineColor: {
            type: String,
        },
        opacity: {
            type: Number
        },
        antialias: {
            type: Boolean
        }
    },
    setup(props) {
        const vmb_map = vue.inject('vmb_map');
        const vmb_polygon = new Polygon({
            id: props.id,
            path: props.path,
            fillColor: props.fillColor,
            outlineColor: props.outlineColor,
            opacity: props.opacity,
            antialias: props.antialias
        });
        vue.provide('vmb_polygon', vmb_polygon);
        vue.onMounted(async () => {
            await updatePolygon(vmb_map, vmb_polygon);
        });
        vue.watch(props, async () => {
            vmb_polygon.updateOptions(props);
            await updatePolygon(vmb_map, vmb_polygon);
        });
        return {
            vmb_map,
            vmb_polygon
        };
    }
});const _hoisted_1$1 = { ref: "features" };

function render$1(_ctx, _cache, $props, $setup, $data, $options) {
  return (vue.openBlock(), vue.createBlock("div", _hoisted_1$1, [
    vue.renderSlot(_ctx.$slots, "default")
  ], 512))
}script$1.render = render$1;class Rectangle extends Geogeometry {
    constructor(input) {
        super(input);
        this.width = input.width;
        this.height = input.height;
        this.center = input.center;
    }
    updateOptions(input) {
        super.updateOptions(input);
        if (input.width)
            this.width = input.width;
        if (input.height)
            this.height = input.height;
    }
    getGeoJSON() {
        const long = distanceToLong(this.width, this.center[1]);
        const lat = distanceToLat(this.height);
        const path = [
            [this.center[0] + long / 2, this.center[1] + lat / 2],
            [this.center[0] + long / 2, this.center[1] - lat / 2],
            [this.center[0] - long / 2, this.center[1] - lat / 2],
            [this.center[0] - long / 2, this.center[1] + lat / 2],
            [this.center[0] + long / 2, this.center[1] + lat / 2]
        ];
        return {
            type: 'geojson',
            data: {
                type: 'FeatureCollection',
                features: [{
                        type: 'Feature',
                        geometry: {
                            type: 'Polygon',
                            coordinates: [path]
                        },
                        properties: {}
                    }],
            }
        };
    }
}const updateRectangle = async (vmb_map, vmb_rectangle) => {
    const map = await vmb_map.promise;
    const rectangle = vmb_rectangle;
    removeLayerIfPresent(rectangle.id, map);
    removeSourceIfPresent(rectangle.id, map);
    map.addSource(rectangle.id, rectangle.getGeoJSON());
    map.addLayer({
        'id': rectangle.id,
        'type': 'fill',
        'source': rectangle.id,
        'layout': {},
        'paint': rectangle.getPaint()
    });
};let polygonsAdded = 0;
var script = vue.defineComponent({
    name: 'MapboxGeogeometryRectangle',
    props: {
        id: {
            type: String,
            default: `rectangle-${polygonsAdded++}`
        },
        center: {
            type: Array,
            required: true
        },
        width: {
            type: Number,
            required: true
        },
        height: {
            type: Number,
            required: true
        },
        fillColor: {
            type: String,
        },
        outlineColor: {
            type: String,
        },
        opacity: {
            type: Number
        },
        antialias: {
            type: Boolean
        }
    },
    setup(props) {
        const vmb_map = vue.inject('vmb_map');
        const vmb_rectangle = new Rectangle({
            id: props.id,
            width: props.width,
            height: props.height,
            center: props.center,
            fillColor: props.fillColor,
            outlineColor: props.outlineColor,
            opacity: props.opacity,
            antialias: props.antialias
        });
        vue.provide('vmb_rectangle', vmb_rectangle);
        vue.onMounted(async () => {
            await updateRectangle(vmb_map, vmb_rectangle);
        });
        vue.watch(props, async () => {
            vmb_rectangle.updateOptions(props);
            await updateRectangle(vmb_map, vmb_rectangle);
        });
        return {
            vmb_map,
            vmb_rectangle
        };
    }
});const _hoisted_1 = { ref: "features" };

function render(_ctx, _cache, $props, $setup, $data, $options) {
  return (vue.openBlock(), vue.createBlock("div", _hoisted_1, [
    vue.renderSlot(_ctx.$slots, "default")
  ], 512))
}script.render = render;// import MapboxGeocoder from './MapboxGeocoder.vue';
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
var components=/*#__PURE__*/Object.freeze({__proto__:null,MapboxMap: script$c,MapboxIcon: script$4,MapboxMarker: script$b,MapboxNavigationControl: script$a,MapboxPopup: script$9,MapboxAttributionControl: script$8,MapboxScaleControl: script$7,MapboxFullscreenControl: script$6,MapboxSourceGeoJson: script$5,MapboxGeolocateControl: script$3,MapboxGeogeometryCircle: script$2,MapboxGeogeometryPolygon: script$1,MapboxGeogeometryRectangle: script});// import { VueConstructor } from 'vue';
var install = (instance) => {
    Object.keys(components).forEach((name) => {
        instance.component(name, components[name]);
    });
};exports.MapboxAttributionControl=script$8;exports.MapboxFullscreenControl=script$6;exports.MapboxGeogeometryCircle=script$2;exports.MapboxGeogeometryPolygon=script$1;exports.MapboxGeogeometryRectangle=script;exports.MapboxGeolocateControl=script$3;exports.MapboxIcon=script$4;exports.MapboxMap=script$c;exports.MapboxMarker=script$b;exports.MapboxNavigationControl=script$a;exports.MapboxPopup=script$9;exports.MapboxScaleControl=script$7;exports.MapboxSourceGeoJson=script$5;exports.default=install;