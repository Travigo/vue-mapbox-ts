import '@mapbox/mapbox-gl-geocoder/dist/mapbox-gl-geocoder.css';
import { defineComponent, inject, ref, onMounted, onUnmounted, watch, getCurrentInstance, openBlock, createElementBlock, withDirectives, createElementVNode, vShow, renderSlot, reactive, toRefs, toRef, provide, normalizeStyle, createStaticVNode, resolveComponent, createVNode, withCtx, createCommentVNode } from 'vue';
import Deferred from 'my-deferred/dist/src';
import mapboxgl, { Marker, GeoJSONSource } from 'mapbox-gl';
import MapboxGeocoder from '@mapbox/mapbox-gl-geocoder';
import Deferred$1 from 'my-deferred';
import equal from 'fast-deep-equal';
import MapboxDrawControl from '@mapbox/mapbox-gl-draw';
import '@mapbox/mapbox-gl-draw/dist/mapbox-gl-draw.css';
import 'mapbox-gl/dist/mapbox-gl.css';

/******************************************************************************
Copyright (c) Microsoft Corporation.

Permission to use, copy, modify, and/or distribute this software for any
purpose with or without fee is hereby granted.

THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
PERFORMANCE OF THIS SOFTWARE.
***************************************************************************** */

function __awaiter(thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
}

const slotIsNotEmpty = (el) => el && el.outerHTML !== '<div></div>';
const filterObject = (object, keys, blacklist = [undefined]) => {
    const result = {};
    const _keys = keys || Object.keys(object);
    for (const key of _keys) {
        if (!blacklist.some(b => b === object[key])) {
            result[key] = object[key];
        }
    }
    return result;
};
const parentsNameIs = (instance, parentName) => {
    if (!instance.parent)
        return false;
    // Vue 3
    if (instance.parent.type)
        return instance.parent.type.name === parentName;
    // Vue 2
    if (instance.parent.vnode.tag)
        return instance.parent.vnode.tag.endsWith(parentName);
    return false;
};
const parentNameContains = (instance, parentNameFragment) => {
    if (!instance.parent)
        return false;
    // Vue 3
    if (instance.parent.type)
        return instance.parent.type.name.includes(parentNameFragment);
    // Vue 2
    if (instance.parent.vnode.tag)
        return instance.parent.vnode.tag.includes(parentNameFragment);
    return false;
};
const duplicateEvents = (object, instance, events) => {
    for (const event of events)
        object.on(event, (evt) => {
            instance.emit(event, evt);
        });
};

var browserIsSafari = () => navigator.userAgent.toLowerCase().includes('safari') && !navigator.userAgent.toLocaleLowerCase().includes('chrome');

const mountGeocoderControl = (vmb_map, vmb_geocoder, props, instance) => __awaiter(void 0, void 0, void 0, function* () {
    const map = vmb_map ? yield vmb_map.promise : null;
    const options = getGeocoderControlOptions(props);
    const geocoder = new MapboxGeocoder(options);
    if (parentsNameIs(instance, 'MapboxMap') && map)
        map.addControl(geocoder);
    else {
        if (instance.parent)
            geocoder.addTo(instance.refs.geocoder);
        if (slotIsNotEmpty(instance.refs['custom-input'])) {
            attachToInput(instance.refs['custom-input'], geocoder, instance);
        }
    }
    vmb_geocoder.resolve(geocoder);
});
const mountGeocoderEvents = (vmb_geocoder, instance) => __awaiter(void 0, void 0, void 0, function* () {
    const geocoder = yield vmb_geocoder.promise;
    geocoder.on('result', (res) => {
        instance.emit('result', res.result);
        instance.proxy.geocoderState.result = res.result;
    });
    geocoder.on('results', (res) => {
        instance.emit('results', res);
        instance.proxy.geocoderState.results = res;
    });
    geocoder.on('error', (err) => {
        instance.emit('error', err);
        instance.proxy.geocoderState.error = err;
    });
    geocoder.on('loading', (query) => {
        instance.emit('loading', query);
        instance.proxy.geocoderState.loading = query;
    });
    geocoder.on('clear', () => {
        instance.emit('clear');
    });
});
const getGeocoderControlOptions = (props) => {
    const options = filterObject(props);
    options.accessToken = props.accessToken || mapboxgl.accessToken;
    options.mapboxgl = mapboxgl;
    return options;
};
const attachToInput = (ref, geocoder, instance) => {
    if (instance && instance.proxy) {
        if (instance.proxy.showOriginalGeocoder)
            instance.proxy.showOriginalGeocoder = false;
        // instance.setupState.showOriginalGeocoder = false;
        const inputs = ref.getElementsByTagName('input');
        if (!inputs)
            throw new Error('MapboxGeocoderControl: No inputs found');
        const input = inputs[0];
        input.addEventListener('keyup', (evt) => {
            geocoder.query(input.value);
            // hotfix for safari focussing on body when keydown is pressed
            // very very ugly still but working. should be investigated further and replaced
            if (browserIsSafari()) {
                setTimeout(() => {
                    input.focus();
                }, 100);
                setTimeout(() => {
                    input.focus();
                }, 200);
            }
        });
    }
};

var script$g = defineComponent({
    name: 'MapboxGeocoderControl',
    props: {
        accessToken: { type: String, default: '' },
        origin: { type: String },
        zoom: { type: Number },
        flyTo: { type: [Boolean, Object], default: () => undefined },
        placeholder: { type: String },
        proximity: { type: Object },
        trackProximity: { type: Boolean, default: () => undefined },
        collapsed: { type: Boolean, default: () => undefined },
        clearAndBlurOnEsc: { type: Boolean, default: () => undefined },
        clearOnBlur: { type: Boolean, default: () => undefined },
        bbox: { type: Array },
        countries: { type: String },
        types: { type: String },
        minLength: { type: Number },
        limit: { type: Number },
        language: { type: String },
        filter: { type: Function },
        localGeocoder: { type: Function },
        externalGeocoder: { type: Function },
        // reverseMode:        { type: String as () => 'distance' | 'score' },
        reverseGeocode: { type: Boolean, default: () => undefined },
        enableEventLogging: { type: Boolean, default: () => undefined },
        marker: { type: Boolean, default: () => undefined },
        render: { type: Function },
        getItemValue: { type: Function },
        mode: { type: String },
        localGeocoderOnly: { type: Boolean, default: () => undefined }
    },
    setup(props) {
        const vmb_map = inject('vmb_map', null);
        const vmb_geocoder = new Deferred();
        const showOriginalGeocoder = ref(true);
        const geocoderState = ref({
            result: {},
            results: {},
            error: null,
            loading: null,
        });
        onMounted(() => __awaiter(this, void 0, void 0, function* () {
            const instance = getCurrentInstance();
            if (instance)
                yield mountGeocoderControl(vmb_map, vmb_geocoder, props, instance);
            if (instance)
                yield mountGeocoderEvents(vmb_geocoder, instance);
        }));
        onUnmounted(() => __awaiter(this, void 0, void 0, function* () {
            const geocoder = yield vmb_geocoder.promise;
            if (vmb_map) {
                const map = yield vmb_map.promise;
                if (!map._removed)
                    map.removeControl(geocoder);
            }
        }));
        watch(props, () => __awaiter(this, void 0, void 0, function* () {
        }));
        return { showOriginalGeocoder, geocoderState };
    }
});

const _hoisted_1$8 = { ref: "geocoder" };
const _hoisted_2$1 = { ref: "custom-input" };

function render$g(_ctx, _cache, $props, $setup, $data, $options) {
  return (openBlock(), createElementBlock("div", null, [
    withDirectives(createElementVNode("div", _hoisted_1$8, null, 512), [
      [vShow, _ctx.showOriginalGeocoder]
    ]),
    createElementVNode("div", _hoisted_2$1, [
      renderSlot(_ctx.$slots, "input", {
        result: _ctx.geocoderState.result,
        results: _ctx.geocoderState.results,
        error: _ctx.geocoderState.error,
        loading: _ctx.geocoderState.loading
      })
    ], 512)
  ]))
}

script$g.render = render$g;

var conditionalWatch = (ref, cb, options) => {
    if (ref && ref.value !== undefined)
        return watch(ref, cb, options);
    else
        return null;
};

function enableAutoResize(rootContainerRef, map, autoResizeDelay) {
    if (window.ResizeObserver) {
        enableAutoResizeWithResizeObserver(rootContainerRef, map);
    }
    else {
        const containerSize = enableAutoResizeWithEventListener(rootContainerRef, autoResizeDelay);
        watch(containerSize, () => {
            map.resize();
        });
    }
}
function enableTouchZoomRotate(map, touchZoomRotate) {
    if (touchZoomRotate.value)
        map.touchZoomRotate.enable();
    watch(touchZoomRotate, val => {
        if (val)
            map.touchZoomRotate.enable();
        else
            map.touchZoomRotate.disable();
    });
}
function enableAutoResizeWithResizeObserver(rootContainerRef, map) {
    if (!rootContainerRef.value)
        throw new Error('Could not enable auto-resize because root container could not be found');
    const observer = new window.ResizeObserver(() => map.resize());
    observer.observe(rootContainerRef.value);
}
function enableAutoResizeWithEventListener(watchedRef, autoResizeDelay) {
    const instance = getCurrentInstance();
    const result = reactive(new DOMRect(0, 0, 0, 0).toJSON());
    if (instance) {
        let boundingBox = watchedRef.value
            ? watchedRef.value.getBoundingClientRect()
            : new DOMRect(0, 0, 0, 0);
        addEventListener('resize', val => {
            setTimeout(() => {
                if (watchedRef.value) {
                    const newBoundingBox = watchedRef.value.getBoundingClientRect().toJSON();
                    const boundingBoxHasChanged = boundingBox.width !== newBoundingBox.width || boundingBox.height !== newBoundingBox.height;
                    boundingBox = newBoundingBox;
                    if (boundingBoxHasChanged)
                        Object.assign(result, newBoundingBox);
                }
            }, autoResizeDelay || 0);
        });
    }
    return result;
}

const getStyle = (props) => ({
    height: props.height,
    width: props.width,
    '--zoom-logo': props.zoomLogo >= 0.8 ? props.zoomLogo : 1,
});
const getMapStyle = (raw) => raw.includes('/') ? raw : `mapbox://styles/mapbox/${raw}`;
const getMapboxOptions = (props, el) => {
    const opts = filterObject(props, [
        'accessToken',
        'antialias',
        'attributionControl',
        'bearing',
        'bearingSnap',
        'bounds',
        'boxZoom',
        'center',
        'clickTolerance',
        'collectResourceTiming',
        'container',
        'cooperativeGestures',
        'crossSourceCollisions',
        'customAttribution',
        'doubleClickZoom',
        'dragPan',
        'dragRotate',
        'fadeDuration',
        'failIfMajorPerformanceCaveat',
        'fitBoundsOptions',
        'hash',
        'interactive',
        'keyboard',
        'localIdeographFontFamily',
        'logoPosition',
        'maxBounds',
        'maxPitch',
        'maxTileCacheSize',
        'maxZoom',
        'minPitch',
        'minZoom',
        'pitch',
        'pitchWithRotate',
        'preserveDrawingBuffer',
        'projection',
        'refreshExpiredTiles',
        'renderWorldCopies',
        'scrollZoom',
        'touchZoomRotate',
        'trackResize',
        'transformRequest',
        'zoom',
    ]);
    opts.style = getMapStyle(props.mapStyle);
    opts.container = el;
    return opts;
};
const mountMap = (props, vmb_map, mapContainerRef, rootContainerRef) => (() => {
    const element = mapContainerRef.value;
    const mapOptions = getMapboxOptions(props, element);
    const map = new mapboxgl.Map(mapOptions);
    map.on('load', () => {
        vmb_map.resolve(map);
    });
    if (props.autoResize) {
        enableAutoResize(rootContainerRef, map, props.autoResizeDelay);
    }
    if (props.touchZoomRotate) {
        enableTouchZoomRotate(map, toRef(props, 'touchZoomRotate'));
    }
})();
const updateStyle = (props, style) => {
    style.value = getStyle(props);
};
function mapWatcher(vmb_map, props, propsReactive) {
    return __awaiter(this, void 0, void 0, function* () {
        const { cooperativeGestures, width, height, bearing, maxBounds, maxPitch, minZoom, maxZoom, minPitch, pitch, projection, renderWorldCopies, zoom, mapStyle } = toRefs(props);
        const { center, flyToOptions } = propsReactive;
        yield watchDimensions(vmb_map, width, height);
        yield watchRegular(vmb_map, { bearing, maxBounds, maxPitch, minPitch, pitch, renderWorldCopies });
        yield watchPosition(vmb_map, { maxZoom, center, flyToOptions, minZoom, zoom });
        yield watchMapStyle(vmb_map, mapStyle);
        yield watchProjection(vmb_map, projection);
    });
}
function watchMapStyle(vmb_map, mapStyle) {
    return __awaiter(this, void 0, void 0, function* () {
        const map = yield vmb_map.promise;
        watch(mapStyle, (newStyle) => map.setStyle(newStyle));
    });
}
function watchDimensions(vmb_map, width, height) {
    return __awaiter(this, void 0, void 0, function* () {
        const map = yield vmb_map.promise;
        watch(width, () => map.resize());
        watch(height, () => map.resize());
    });
}
function watchRegular(vmb_map, refs) {
    return __awaiter(this, void 0, void 0, function* () {
        const map = yield vmb_map.promise;
        conditionalWatch(refs.bearing, val => map.setBearing(val));
        conditionalWatch(refs.maxBounds, val => map.setMaxBounds(val));
        conditionalWatch(refs.maxPitch, val => map.setMaxPitch(val));
        conditionalWatch(refs.minPitch, val => map.setMinPitch(val));
        conditionalWatch(refs.pitch, val => map.setPitch(val));
        conditionalWatch(refs.renderWorldCopies, val => map.setRenderWorldCopies(val));
    });
}
function watchPosition(vmb_map, refs) {
    conditionalWatch(refs.center, center => updateMapPosition(vmb_map, { center }), { deep: true });
    conditionalWatch(refs.flyToOptions, flyToOptions => updateMapPosition(vmb_map, { flyToOptions }), { deep: true });
    conditionalWatch(refs.maxZoom, maxZoom => updateMapPosition(vmb_map, { maxZoom }));
    conditionalWatch(refs.minZoom, minZoom => updateMapPosition(vmb_map, { minZoom }));
    conditionalWatch(refs.zoom, zoom => updateMapPosition(vmb_map, { zoom }));
}
// Update with type definition after mapbox updates @types/mapbox-gl
function watchProjection(vmb_map, projectionRef) {
    return __awaiter(this, void 0, void 0, function* () {
        const map = yield vmb_map.promise;
        conditionalWatch(projectionRef, proj => map.setProjection(proj));
    });
}
function updateMapPosition(vmb_map, posProps) {
    return __awaiter(this, void 0, void 0, function* () {
        const map = yield vmb_map.promise;
        const opts = posProps.flyToOptions
            ? filterObject(posProps.flyToOptions, ['curve', 'maxDuration', 'minZoom', 'screenSpeed', 'speed'])
            : {};
        if (posProps.center)
            opts.center = posProps.center;
        if (posProps.zoom)
            opts.zoom = posProps.zoom;
        map.flyTo(opts);
    });
}
const MapGlEvents = [
    'boxzoomstart',
    'click',
    'contextmenu',
    'data',
    'dataloading',
    'dblclick',
    'drag',
    'dragend',
    'dragstart',
    'error',
    'idle',
    'load',
    'mousedown',
    'mouseenter',
    'mouseleave',
    'mousemouve',
    'mouseout',
    'mouseover',
    'mouseup',
    'move',
    'moveend',
    'movestart',
    'pitch',
    'pitchend',
    'pitchstart',
    'remove',
    // 'render',
    'resize',
    'rotate',
    'rotateend',
    'rotatestart',
    'sourcedata',
    'sourcedataloading',
    'styledata',
    'styledataloading',
    'styleimagemissing',
    'touchcancel',
    'touchend',
    'touchstart',
    'webglcontextlost',
    'webglcontextrestored',
    'wheel',
    'zoom',
    'zoomend',
    'zoomstart'
];
const MapEmits = [
    ...MapGlEvents,
    'update:center',
    'update:flyToOptions',
    'update:zoom',
    'update:pitch',
    'update:bearing',
    'loaded'
];
const registerMapEvents = (vmb_map, instance) => __awaiter(void 0, void 0, void 0, function* () {
    const map = yield vmb_map.promise;
    duplicateEvents(map, instance, MapGlEvents);
    instance.emit('loaded', map);
    map.on('zoomend', evt => {
        instance.emit('update:zoom', evt.target.getZoom());
        instance.emit('update:center', evt.target.getCenter().toArray());
    });
    map.on('dragend', evt => {
        instance.emit('update:center', evt.target.getCenter().toArray());
    });
    map.on('pitchend', evt => {
        instance.emit('update:pitch', evt.target.getPitch());
    });
    map.on('rotateend', evt => {
        instance.emit('update:bearing', evt.target.getBearing());
    });
});

const isPrimitive = (input) => {
    const primitives = ['string', 'number', 'boolean'];
    let isPrimitive = false;
    if (input === null)
        isPrimitive = true;
    if (primitives.some(p => typeof input === p))
        isPrimitive = true;
    return isPrimitive;
};

function vmodel (propertyValue, eventName = 'change', modelName = 'value') {
    const instance = getCurrentInstance();
    const eventNames = eventName instanceof Array
        ? eventName
        : [eventName];
    if (!instance)
        throw new Error('vmodel: Instance not found');
    const internal = ref(instance.props[modelName] || propertyValue);
    for (const eventName of eventNames)
        watch(internal, _val => {
            instance.emit(eventName, internal.value);
        });
    watch(instance.props, () => {
        if (isPrimitive(instance.props[modelName])
            ? instance.props[modelName] !== internal.value
            : !equal(instance.props[modelName], internal.value))
            internal.value = instance.props[modelName];
    });
    return internal;
}

var script$f = defineComponent({
    name: 'MapboxMap',
    emits: MapEmits,
    props: {
        accessToken: {
            type: String,
            required: true
        },
        height: {
            type: String,
            default: '100%'
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
        },
        interactive: {
            type: Boolean,
            default: true,
        },
        bearingSnap: {
            type: Number,
        },
        pitchWithRotate: {
            type: Boolean,
            default: true
        },
        clickTolerance: {
            type: Number,
        },
        attributionControl: {
            type: Boolean,
            default: true
        },
        customAttribution: {
            type: Array,
        },
        logoPosition: {
            type: String,
            default: 'bottom-left',
        },
        failIfMajorPerformanceCaveat: {
            type: Boolean,
        },
        preserveDrawingBuffer: {
            type: Boolean,
        },
        antialias: {
            type: Boolean,
        },
        refreshExpiredTiles: {
            type: Boolean,
        },
        maxBounds: {
            type: [Array, Object],
        },
        scrollZoom: {
            type: [Boolean, Object],
            default: true
        },
        boxZoom: {
            type: Boolean,
        },
        dragRotate: {
            type: Boolean,
            default: true
        },
        dragPan: {
            type: [Object, Boolean],
            default: true
        },
        keyboard: {
            type: Boolean,
        },
        doubleClickZoom: {
            type: Boolean,
        },
        touchZoomRotate: {
            type: [Boolean, Object],
            default: true
        },
        trackResize: {
            type: Boolean,
            default: true
        },
        center: {
            default: () => [0, 0],
        },
        zoom: {
            type: Number,
        },
        bearing: {
            type: Number,
        },
        pitch: {
            type: Number,
        },
        bounds: {
            type: Array,
        },
        fitBoundsOptions: {
            type: Object,
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
        flyToOptions: {
            default: () => ({})
        },
        autoResize: {
            type: Boolean,
            default: false
        },
        autoResizeDelay: {
            type: Number
        },
        cooperativeGestures: {
            type: Boolean,
            default: false
        },
        projection: {
            type: String
        }
    },
    setup: (props) => {
        const root = ref(null);
        const mapContainer = ref(null);
        const vmb_map = new Deferred$1();
        provide('vmb_map', vmb_map);
        const i_center = vmodel(props, 'update:center', 'center');
        const i_flyToOptions = vmodel(props, 'update:flyToOptions', 'flyToOptions');
        const style = ref(getStyle(props));
        watch(props, (p) => __awaiter(void 0, void 0, void 0, function* () {
            updateStyle(p, style);
        }));
        mapWatcher(vmb_map, props, { center: i_center, flyToOptions: i_flyToOptions });
        onMounted(() => __awaiter(void 0, void 0, void 0, function* () {
            const instance = getCurrentInstance();
            mapboxgl.accessToken = props.accessToken;
            mountMap(props, vmb_map, mapContainer, root);
            if (instance)
                yield registerMapEvents(vmb_map, instance);
        }));
        onUnmounted(() => __awaiter(void 0, void 0, void 0, function* () {
            const map = yield vmb_map.promise;
            map.remove();
        }));
        return {
            vmb_map,
            root,
            style,
            i_center,
            i_flyToOptions,
            mapContainer
        };
    },
});

const _hoisted_1$7 = { key: 1 };

function render$f(_ctx, _cache, $props, $setup, $data, $options) {
  return (openBlock(), createElementBlock("div", {
    style: normalizeStyle(_ctx.style),
    ref: "root",
    class: "mapbox-map"
  }, [
    createElementVNode("div", null, [
      renderSlot(_ctx.$slots, "default")
    ]),
    (_ctx.vmb_map.isResolved)
      ? (openBlock(), createElementBlock("div", {
          key: 0,
          ref: "mapContainer",
          class: "map-container",
          style: normalizeStyle({ height: _ctx.height, width: _ctx.width })
        }, null, 4))
      : (openBlock(), createElementBlock("div", _hoisted_1$7, [
          renderSlot(_ctx.$slots, "loader", {}, () => [
            createElementVNode("div", {
              style: normalizeStyle(_ctx.style)
            }, null, 4)
          ])
        ]))
  ], 4))
}

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

var css_248z = "[data-v-55cc3ed8] .mapboxgl-ctrl-logo {\n  zoom: var(--zoom-logo);\n}";
styleInject(css_248z);

script$f.render = render$f;
script$f.__scopeId = "data-v-55cc3ed8";

var injectMap = {
    setup() {
        const vmb_map = inject('vmb_map', null);
        return { vmb_map };
    },
};

const parentIsMarker = (instance) => parentsNameIs(instance, 'MapboxMarker');
const getMarkerOptions = (props) => filterObject(props, [
    'element',
    'offset',
    'anchor',
    'color',
    'draggable',
    'clickTolerance',
    'rotation',
    'rotationAlignment',
    'pitchAlignment',
    'scale'
]);
const MarkerGlEvents = ['drag', 'dragend', 'dragstart'];
const MarkerEmits = [...MarkerGlEvents, 'update:lngLat', 'click'];
const registerMarkerEvents = (marker, component) => {
    duplicateEvents(marker, component, MarkerGlEvents);
    marker.on('dragend', (evt) => component.emit('update:lngLat', evt.target._lngLat.toArray()));
    marker.getElement().addEventListener('click', _ev => component.emit('click', _ev));
};
const updateMarker = (props, vmb_marker) => __awaiter(void 0, void 0, void 0, function* () {
    const marker = yield vmb_marker.promise;
    const opts = filterObject(props);
    if (typeof opts.draggable === 'boolean')
        marker.setDraggable(opts.draggable);
    if (opts.lngLat)
        marker.setLngLat(opts.lngLat);
    if (opts.offset)
        marker.setOffset(opts.offset);
    if (opts.rotation)
        marker.setRotation(opts.rotation);
    if (opts.pitchAlignment)
        marker.setPitchAlignment(opts.pitchAlignment);
    if (opts.rotationAlignment)
        marker.setRotationAlignment(opts.rotationAlignment);
});
const mountMarker = (options, vmb_map, vmb_marker, instance, lngLat, element) => __awaiter(void 0, void 0, void 0, function* () {
    const map = yield vmb_map.promise;
    if (element && slotIsNotEmpty(element.value))
        options.element = element.value;
    const marker = new Marker(options)
        .setLngLat(lngLat);
    marker.addTo(map);
    vmb_marker.resolve(marker);
});

var script$e = defineComponent({
    name: 'MapboxMarker',
    emits: MarkerEmits,
    props: {
        lngLat: {
            default: () => [0, 0],
        },
        offset: {
            type: [Array],
            default: () => [0, 0],
        },
        anchor: {
            type: String,
            default: () => 'bottom',
        },
        color: {
            type: String,
            default: '#4668F2',
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
        const vmb_marker = new Deferred();
        const icon = ref(null);
        const options = getMarkerOptions(props);
        provide('vmb_marker', vmb_marker);
        onMounted(() => __awaiter(this, void 0, void 0, function* () {
            const instance = getCurrentInstance();
            if (instance && vmb_map) {
                yield mountMarker(options, vmb_map, vmb_marker, instance, props.lngLat, icon);
                const marker = yield vmb_marker.promise;
                registerMarkerEvents(marker, instance);
            }
        }));
        onUnmounted(() => __awaiter(this, void 0, void 0, function* () {
            const marker = yield vmb_marker.promise;
            marker.remove();
        }));
        watch(props, (p) => __awaiter(this, void 0, void 0, function* () {
            yield updateMarker(p, vmb_marker);
        }));
        return { icon };
    },
});

const _hoisted_1$6 = { ref: "icon" };
const _hoisted_2 = ["height", "width"];
const _hoisted_3 = { "fill-rule": "nonzero" };
const _hoisted_4 = /*#__PURE__*/createStaticVNode("<g transform=\"translate(3.0, 29.0)\" fill=\"#000000\"><ellipse opacity=\"0.04\" cx=\"10.5\" cy=\"5.80029008\" rx=\"10.5\" ry=\"5.25002273\"></ellipse><ellipse opacity=\"0.04\" cx=\"10.5\" cy=\"5.80029008\" rx=\"10.5\" ry=\"5.25002273\"></ellipse><ellipse opacity=\"0.04\" cx=\"10.5\" cy=\"5.80029008\" rx=\"9.5\" ry=\"4.77275007\"></ellipse><ellipse opacity=\"0.04\" cx=\"10.5\" cy=\"5.80029008\" rx=\"8.5\" ry=\"4.29549936\"></ellipse><ellipse opacity=\"0.04\" cx=\"10.5\" cy=\"5.80029008\" rx=\"7.5\" ry=\"3.81822308\"></ellipse><ellipse opacity=\"0.04\" cx=\"10.5\" cy=\"5.80029008\" rx=\"6.5\" ry=\"3.34094679\"></ellipse><ellipse opacity=\"0.04\" cx=\"10.5\" cy=\"5.80029008\" rx=\"5.5\" ry=\"2.86367051\"></ellipse><ellipse opacity=\"0.04\" cx=\"10.5\" cy=\"5.80029008\" rx=\"4.5\" ry=\"2.38636864\"></ellipse></g>", 1);
const _hoisted_5 = ["fill"];
const _hoisted_6 = /*#__PURE__*/createElementVNode("path", { d: "M27,13.5 C27,19.074644 20.250001,27.000002 14.75,34.500002 C14.016665,35.500004 12.983335,35.500004 12.25,34.500002 C6.7499993,27.000002 0,19.222562 0,13.5 C0,6.0441559 6.0441559,0 13.5,0 C20.955844,0 27,6.0441559 27,13.5 Z" }, null, -1);
const _hoisted_7 = [
  _hoisted_6
];
const _hoisted_8 = /*#__PURE__*/createStaticVNode("<g opacity=\"0.25\" fill=\"#000000\"><path d=\"M13.5,0 C6.0441559,0 0,6.0441559 0,13.5 C0,19.222562 6.7499993,27 12.25,34.5 C13,35.522727 14.016664,35.500004 14.75,34.5 C20.250001,27 27,19.074644 27,13.5 C27,6.0441559 20.955844,0 13.5,0 Z M13.5,1 C20.415404,1 26,6.584596 26,13.5 C26,15.898657 24.495584,19.181431 22.220703,22.738281 C19.945823,26.295132 16.705119,30.142167 13.943359,33.908203 C13.743445,34.180814 13.612715,34.322738 13.5,34.441406 C13.387285,34.322738 13.256555,34.180814 13.056641,33.908203 C10.284481,30.127985 7.4148684,26.314159 5.015625,22.773438 C2.6163816,19.232715 1,15.953538 1,13.5 C1,6.584596 6.584596,1 13.5,1 Z\"></path></g><g transform=\"translate(6.0, 7.0)\" fill=\"#FFFFFF\"></g><g transform=\"translate(8.0, 8.0)\"><circle fill=\"#000000\" opacity=\"0.25\" cx=\"5.5\" cy=\"5.5\" r=\"5.4999962\"></circle><circle fill=\"#FFFFFF\" cx=\"5.5\" cy=\"5.5\" r=\"5.4999962\"></circle></g>", 3);

function render$e(_ctx, _cache, $props, $setup, $data, $options) {
  return (openBlock(), createElementBlock("div", null, [
    createElementVNode("div", _hoisted_1$6, [
      renderSlot(_ctx.$slots, "icon", {}, () => [
        (openBlock(), createElementBlock("svg", {
          display: "block",
          height: 42*_ctx.scale+'px',
          width: 27*_ctx.scale+'px',
          viewBox: "0 0 27 41"
        }, [
          createElementVNode("g", _hoisted_3, [
            _hoisted_4,
            createElementVNode("g", { fill: _ctx.color }, _hoisted_7, 8, _hoisted_5),
            _hoisted_8
          ])
        ], 8, _hoisted_2))
      ])
    ], 512),
    renderSlot(_ctx.$slots, "default")
  ]))
}

script$e.render = render$e;

const getNavigationControlOptions = (props) => {
    const { showCompass, showZoom, vizualizePitch } = props;
    return {
        showCompass,
        showZoom,
        vizualizePitch
    };
};
const mountNavigationControl = (nav, vmb_map, position) => (() => __awaiter(void 0, void 0, void 0, function* () {
    const map = yield vmb_map.promise;
    map.addControl(nav, position);
}))();

var script$d = defineComponent({
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
        const vmb_map = inject('vmb_map', null);
        const navOptions = getNavigationControlOptions(props);
        const vmb_navigationControl = new mapboxgl.NavigationControl(navOptions);
        const position = props.position;
        onMounted(() => {
            if (vmb_map)
                mountNavigationControl(vmb_navigationControl, vmb_map, position);
        });
        onUnmounted(() => __awaiter(this, void 0, void 0, function* () {
            if (vmb_map) {
                const map = yield vmb_map.promise;
                map.removeControl(vmb_navigationControl);
            }
        }));
    }
});

function render$d(_ctx, _cache, $props, $setup, $data, $options) {
  return (openBlock(), createElementBlock("div"))
}

script$d.render = render$d;

const removeLayerIfPresent = (id, map) => {
    const layer = map.getLayer(id);
    if (layer)
        map.removeLayer(id);
};

const removeSourceIfPresent = (id, map) => {
    const source = map.getSource(id);
    if (source)
        map.removeSource(id);
};

const parentIsGeogeometry = (instance) => parentNameContains(instance, 'MapboxGeogeometry');
const distanceToLat = (km) => km / 110.574;
const distanceToLong = (km, lat) => km / (Math.cos(lat * Math.PI / 180) * 111.32);
const mountGeogeometry = (vmb_map, vmb_geogeometry) => __awaiter(void 0, void 0, void 0, function* () {
    const map = yield vmb_map.promise;
    const geogeometry = vmb_geogeometry;
    removeLayerIfPresent(geogeometry.id, map);
    removeSourceIfPresent(geogeometry.id, map);
    map.addSource(geogeometry.id, geogeometry.getGeoJSON());
    // map.addLayer(geogeometry.getLayer());
});
const updateGeogeometry = (props, vmb_map, vmb_geogeometry) => __awaiter(void 0, void 0, void 0, function* () {
    const map = yield vmb_map.promise;
    const geo = vmb_geogeometry;
    const opts = filterObject(props);
    const source = map.getSource(geo.id);
    geo.updateOptions(opts);
    source.setData(geo.getGeoJSON().data);
});

const attachToMarker = (instance, vmb_marker, popup) => __awaiter(void 0, void 0, void 0, function* () {
    if (vmb_marker) {
        const marker = yield vmb_marker.promise;
        marker.setPopup(popup);
    }
});
const attachToGeogeometry = (vmb_map, vmb_geo_paint, popup) => __awaiter(void 0, void 0, void 0, function* () {
    const paint = yield vmb_geo_paint.promise;
    const map = yield vmb_map.promise;
    if (paint.id) {
        const geo = yield paint.geogeometry.promise;
        map.on('click', paint.id, e => {
            const coordinates = geo.center;
            popup
                .setLngLat(coordinates)
                .addTo(map);
        });
    }
});
const getPopupOptions = (props) => filterObject(props, [
    'closeButton',
    'closeOnClick',
    'closeOnMove',
    'focusAfterOpen',
    'anchor',
    'offset',
    'className',
    'maxWidth'
]);
const mountPopup = (
// instance: ComponentInternalInstance | null,
instance, vmb_map, vmb_popup, vmb_marker, vmb_geogeometry_paint, content) => __awaiter(void 0, void 0, void 0, function* () {
    const map = yield vmb_map.promise;
    const popup = vmb_popup;
    if (content.value)
        popup.setDOMContent(content.value);
    if (parentIsMarker(instance))
        yield attachToMarker(instance, vmb_marker, popup);
    else if (parentIsGeogeometry(instance) && vmb_geogeometry_paint) {
        yield attachToGeogeometry(vmb_map, vmb_geogeometry_paint, popup);
    }
    else {
        popup.addTo(map);
    }
});
const PopupGlEvents = ['close', 'open'];
const PopupEmits = [...PopupGlEvents];
const registerPopupEvents = (vmb_popup, instance) => {
    duplicateEvents(vmb_popup, instance, PopupGlEvents);
};
const updatePopup = (props, vmb_popup) => __awaiter(void 0, void 0, void 0, function* () {
    const opts = getPopupOptions(props);
    if (opts.maxWidth)
        vmb_popup.setMaxWidth(opts.maxWidth);
    if (opts.offset)
        vmb_popup.setOffset(opts.offset);
    if (props.lngLat)
        vmb_popup.setLngLat(props.lngLat);
});

var script$c = defineComponent({
    name: 'MapboxPopup',
    emits: PopupEmits,
    props: {
        lngLat: {
            type: [Object, Array],
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
            type: [Number, Array],
            default: undefined
        },
        className: {
            type: String
        },
        focusAfterOpen: {
            type: Boolean,
            default: true
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
        const vmb_map = inject('vmb_map', null);
        const vmb_marker = inject('vmb_marker', null);
        const vmb_paint = inject('vmb_geogeometry_paint', null);
        const popupOptions = getPopupOptions(props);
        const vmb_popup = new mapboxgl.Popup(popupOptions)
            .setLngLat(props.lngLat);
        onMounted(() => __awaiter(this, void 0, void 0, function* () {
            const instance = getCurrentInstance();
            if (vmb_map && instance) {
                yield mountPopup(instance, vmb_map, vmb_popup, vmb_marker, vmb_paint, content);
                registerPopupEvents(vmb_popup, instance);
            }
        }));
        watch(props, props => {
            updatePopup(props, vmb_popup);
        });
        onUnmounted(() => __awaiter(this, void 0, void 0, function* () {
            vmb_popup.remove();
        }));
        return { content };
    }
});

const _hoisted_1$5 = { ref: "content" };

function render$c(_ctx, _cache, $props, $setup, $data, $options) {
  return (openBlock(), createElementBlock("div", _hoisted_1$5, [
    renderSlot(_ctx.$slots, "default")
  ], 512))
}

script$c.render = render$c;

const getAttributionControlOptions = (props) => filterObject(props);
const mountAttributionControl = (vmb_map, vmb_attributionControl) => __awaiter(void 0, void 0, void 0, function* () {
    const map = yield vmb_map.promise;
    map.addControl(vmb_attributionControl);
});

var script$b = defineComponent({
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
        const vmb_attributionControl = new mapboxgl.AttributionControl(opts);
        const vmb_map = inject('vmb_map', null);
        onMounted(() => __awaiter(this, void 0, void 0, function* () {
            if (vmb_map)
                mountAttributionControl(vmb_map, vmb_attributionControl);
        }));
        onUnmounted(() => __awaiter(this, void 0, void 0, function* () {
            if (vmb_map) {
                const map = yield vmb_map.promise;
                map.removeControl(vmb_attributionControl);
            }
        }));
    }
});

function render$b(_ctx, _cache, $props, $setup, $data, $options) {
  return (openBlock(), createElementBlock("div"))
}

script$b.render = render$b;

const getScaleControlOptions = (props) => {
    const { maxWidth, unit } = props;
    return {
        maxWidth,
        unit
    };
};
const mountScaleControl = (vmb_map, vmb_scaleControl) => __awaiter(void 0, void 0, void 0, function* () {
    const map = yield vmb_map.promise;
    map.addControl(vmb_scaleControl);
});

var script$a = defineComponent({
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
        const vmb_scaleControl = new mapboxgl.ScaleControl(options);
        const vmb_map = inject('vmb_map', null);
        onMounted(() => __awaiter(this, void 0, void 0, function* () {
            if (vmb_map)
                yield mountScaleControl(vmb_map, vmb_scaleControl);
        }));
        onUnmounted(() => __awaiter(this, void 0, void 0, function* () {
            if (vmb_map) {
                const map = yield vmb_map.promise;
                map.removeControl(vmb_scaleControl);
            }
        }));
    }
});

function render$a(_ctx, _cache, $props, $setup, $data, $options) {
  return (openBlock(), createElementBlock("div"))
}

script$a.render = render$a;

const getFullscreenControlOptions = (props) => filterObject(props);
const mountFullscreenControl = (vmb_fullscreenControl, vmb_map) => __awaiter(void 0, void 0, void 0, function* () {
    const map = yield vmb_map.promise;
    map.addControl(vmb_fullscreenControl);
});

var script$9 = defineComponent({
    name: 'MapboxFullscreenControl',
    props: {
        container: {
            type: Object,
            default: undefined
        }
    },
    setup(props) {
        const vmb_map = inject('vmb_map', null);
        const options = getFullscreenControlOptions(props);
        const vmb_fullscreenControl = new mapboxgl.FullscreenControl(options);
        onMounted(() => __awaiter(this, void 0, void 0, function* () {
            if (vmb_map)
                yield mountFullscreenControl(vmb_fullscreenControl, vmb_map);
        }));
        onUnmounted(() => __awaiter(this, void 0, void 0, function* () {
            if (vmb_map) {
                const map = yield vmb_map.promise;
                map.removeControl(vmb_fullscreenControl);
            }
        }));
    }
});

function render$9(_ctx, _cache, $props, $setup, $data, $options) {
  return (openBlock(), createElementBlock("div"))
}

script$9.render = render$9;

const getDrawControlOptions = (props) => filterObject(props, ['position']);
const mapDrawEvents = (vmb_map, component) => {
    vmb_map.on('draw.create', (e) => {
        component.emit('create', e);
    });
    vmb_map.on('draw.update', (e) => {
        component.emit('update', e);
    });
    vmb_map.on('draw.delete', (e) => {
        component.emit('delete', e);
    });
    vmb_map.on('draw.selectionchange', (e) => {
        component.emit('selectionchange', e);
    });
};
const mountDrawControl = (vmb_map, vmb_drawControl, opts, component) => __awaiter(void 0, void 0, void 0, function* () {
    component.emit('loaded', vmb_drawControl);
    const map = yield vmb_map.promise;
    mapDrawEvents(map, component);
    map.addControl(vmb_drawControl, opts.position);
});

var script$8 = defineComponent({
    name: 'MapboxDrawControl',
    props: {
        position: {
            type: String,
            default: 'top-left'
        }
    },
    setup(props) {
        const opts = getDrawControlOptions(props);
        const vmb_drawControl = new MapboxDrawControl();
        const vmb_map = inject('vmb_map', null);
        onMounted(() => __awaiter(this, void 0, void 0, function* () {
            const component = getCurrentInstance();
            if (vmb_map && component)
                mountDrawControl(vmb_map, vmb_drawControl, opts, component);
        }));
        onUnmounted(() => __awaiter(this, void 0, void 0, function* () {
            if (vmb_map) {
                const map = yield vmb_map.promise;
                map.removeControl(vmb_drawControl);
            }
        }));
    }
});

function render$8(_ctx, _cache, $props, $setup, $data, $options) {
  return (openBlock(), createElementBlock("div"))
}

script$8.render = render$8;

var script$7 = defineComponent({
    name: 'MapboxSourceGeoJson',
    props: {
        container: {
            type: Object,
            default: undefined
        }
    },
    setup(props) {
        const vmb_map = inject('vmb_map', null);
        new GeoJSONSource();
        onMounted(() => __awaiter(this, void 0, void 0, function* () {
            if (vmb_map) {
                const map = yield vmb_map.promise;
                map.addSource;
            }
        }));
    }
});

const _hoisted_1$4 = { ref: "features" };

function render$7(_ctx, _cache, $props, $setup, $data, $options) {
  return (openBlock(), createElementBlock("div", _hoisted_1$4, [
    renderSlot(_ctx.$slots, "default")
  ], 512))
}

script$7.render = render$7;

const getGeolocationControlOptions = (props) => filterObject(props);

var script$6 = defineComponent({
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
        },
        position: {
            type: String,
            default: () => 'top-right'
        }
    },
    setup(props) {
        const vmb_map = inject('vmb_map', null);
        const options = getGeolocationControlOptions(props);
        const vmb_geolocationControl = new mapboxgl.GeolocateControl(options);
        const position = props.position;
        onMounted(() => __awaiter(this, void 0, void 0, function* () {
            if (vmb_map) {
                const map = yield vmb_map.promise;
                map.addControl(vmb_geolocationControl, position);
            }
        }));
        onUnmounted(() => __awaiter(this, void 0, void 0, function* () {
            if (vmb_map) {
                const map = yield vmb_map.promise;
                map.removeControl(vmb_geolocationControl);
            }
        }));
    }
});

function render$6(_ctx, _cache, $props, $setup, $data, $options) {
  return (openBlock(), createElementBlock("div"))
}

script$6.render = render$6;

class Geogeometry {
    constructor(input) {
        this.id = input.id;
        this.fillColor = input.fillColor || '#4668F2';
        this.antialias = typeof input.antialias === 'boolean' ? input.antialias : true;
        this.opacity = typeof input.opacity === 'number' ? input.opacity : 0.6;
        if (input.outlineColor)
            this.outlineColor = input.outlineColor;
        this.deferred = new Deferred();
        provide('vmb_geogeometry', this.deferred);
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
    getLayer() {
        return {
            'id': this.id,
            'type': 'fill',
            'source': this.id,
            'layout': {},
            'paint': this.getPaint()
        };
    }
}

class Circle extends Geogeometry {
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
        path.push(path[0]);
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
}

class GeogeometryPaint {
    constructor(input) {
        this.geogeometry = input.geogeometry;
        this.deferred = new Deferred();
        provide('vmb_geogeometry_paint', this.deferred);
    }
    _init(paintType, id) {
        return __awaiter(this, void 0, void 0, function* () {
            const geogeometry = yield this.geogeometry.promise;
            this.geoId = geogeometry.id;
            this.id = `${this.geoId}-${paintType}-${id}`;
        });
    }
    setGeoId(id) {
        this.geoId = id;
    }
}

let fillsAdded = 0;
class GeogeometryFill extends GeogeometryPaint {
    constructor(input) {
        super(input);
        this.geoId = input.geoId;
        this.id = `${input.geoId}-fill-${fillsAdded++}`;
        this.color = input.color || '#4668F2';
        this.antialias = typeof input.antialias === 'boolean' ? input.antialias : true;
        this.opacity = typeof input.opacity === 'number' ? input.opacity : 0.6;
        if (input.outlineColor)
            this.outlineColor = input.outlineColor;
    }
    init() {
        const _super = Object.create(null, {
            _init: { get: () => super._init }
        });
        return __awaiter(this, void 0, void 0, function* () {
            yield _super._init.call(this, 'fill', fillsAdded++);
        });
    }
    getPaint() {
        const paint = {};
        if (this.color)
            paint['fill-color'] = this.color;
        if (this.antialias)
            paint['fill-antialias'] = this.antialias;
        if (this.opacity)
            paint['fill-opacity'] = this.opacity;
        if (this.outlineColor)
            paint['fill-outline-color'] = this.outlineColor;
        return paint;
    }
    update(props, vmb_map) {
        return __awaiter(this, void 0, void 0, function* () {
            const map = yield vmb_map.promise;
            const opts = filterObject(props);
            if (this.id) {
                if (opts.color && opts.color !== this.color) {
                    map.setPaintProperty(this.id, 'fill-color', opts.color);
                    this.color = opts.color;
                }
                if (typeof opts.antialias === 'boolean' && opts.antialias !== this.antialias) {
                    map.setPaintProperty(this.id, 'fill-antialias', opts.antialias);
                    this.antialias = opts.antialias;
                }
                if (typeof opts.opacity === 'number' && opts.opacity !== this.opacity) {
                    map.setPaintProperty(this.id, 'fill-opacity', opts.opacity);
                    this.opacity = opts.opacity;
                }
                if (opts.outlineColor && opts.outlineColor !== this.outlineColor) {
                    map.setPaintProperty(this.id, 'fill-outline-color', opts.outlineColor);
                    this.outlineColor = opts.outlineColor;
                }
            }
        });
    }
    getLayer() {
        if (this.id) {
            return {
                id: this.id,
                type: 'fill',
                source: this.geoId,
                layout: {},
                paint: this.getPaint()
            };
        }
        else {
            throw new Error('Geogeometry.Paint.Fill: Cannot get layer. Not initialized');
        }
    }
}

var script$5 = defineComponent({
    name: 'MapboxGeogeometryFill',
    props: {
        color: {
            type: String,
            default: '#4668F2'
        },
        antialias: {
            type: Boolean,
            default: true
        },
        opacity: {
            type: Number,
            default: 0.6
        },
        outlineColor: {
            type: String
        }
    },
    setup(props) {
        const vmb_geogeometry = inject('vmb_geogeometry', null);
        const vmb_fill = new Deferred();
        const vmb_map = inject('vmb_map', null);
        if (!vmb_geogeometry)
            throw new Error('MapboxGeogeometryFill: no geogeometry found as parent');
        const fill = new GeogeometryFill(Object.assign(Object.assign({}, filterObject(props)), { geogeometry: vmb_geogeometry }));
        provide('vmb_fill', vmb_fill);
        onMounted(() => __awaiter(this, void 0, void 0, function* () {
            if (vmb_map && vmb_geogeometry) {
                const map = yield vmb_map.promise;
                const geogeometry = yield vmb_geogeometry.promise;
                if (geogeometry && map) {
                    yield fill.init();
                    map.addLayer(fill.getLayer());
                    vmb_fill.resolve(fill);
                    fill.deferred.resolve(fill);
                }
            }
        }));
        watch(props, () => __awaiter(this, void 0, void 0, function* () {
            const fill = yield vmb_fill.promise;
            if (fill && vmb_map)
                fill.update(props, vmb_map);
        }));
        onUnmounted(() => __awaiter(this, void 0, void 0, function* () {
            if (vmb_map && fill.id) {
                const map = yield vmb_map.promise;
                map.removeLayer(fill.id);
            }
        }));
        return {};
    }
});

function render$5(_ctx, _cache, $props, $setup, $data, $options) {
  return (openBlock(), createElementBlock("div", null, [
    renderSlot(_ctx.$slots, "default")
  ]))
}

script$5.render = render$5;

let circlesAdded = 0;
var script$4 = defineComponent({
    name: 'MapboxGeogeometryCircle',
    components: {
        // WORKAROUND FIX NEEDED BUT CURRENTLY DOES NOT COMPILE (MAYBE PROBLEM WITH DEFINECOMPONENTS RETURN TYPE)
        MapboxGeogeometryFill: script$5
    },
    props: {
        id: {
            type: String,
            default: 'circle'
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
        const vmb_map = inject('vmb_map', null);
        const vmb_circle = new Deferred$1();
        const id = `${props.id}-${circlesAdded++}`;
        const circle = new Circle(filterObject(Object.assign(Object.assign({}, props), { id }), [
            'id',
            'radius',
            'center',
            'edges',
            'fillColor',
            'outlineColor',
            'opacity',
            'antialias'
        ]));
        provide('vmb_circle', vmb_circle);
        onMounted(() => __awaiter(this, void 0, void 0, function* () {
            if (vmb_map) {
                yield mountGeogeometry(vmb_map, circle);
                vmb_circle.resolve(circle);
                circle.deferred.resolve(circle);
            }
        }));
        watch(props, () => __awaiter(this, void 0, void 0, function* () {
            if (vmb_map) {
                yield updateGeogeometry(props, vmb_map, circle);
            }
        }));
        onUnmounted(() => __awaiter(this, void 0, void 0, function* () {
            if (vmb_map) {
                const map = yield vmb_map.promise;
                map.removeLayer(circle.id);
            }
        }));
    }
});

const _hoisted_1$3 = { ref: "features" };

function render$4(_ctx, _cache, $props, $setup, $data, $options) {
  const _component_mapbox_geogeometry_fill = resolveComponent("mapbox-geogeometry-fill");

  return (openBlock(), createElementBlock("div", _hoisted_1$3, [
    renderSlot(_ctx.$slots, "default", {}, () => [
      createVNode(_component_mapbox_geogeometry_fill, {
        color: _ctx.fillColor,
        outlineColor: _ctx.outlineColor,
        opacity: _ctx.opacity,
        antialias: _ctx.antialias
      }, {
        default: withCtx(() => [
          renderSlot(_ctx.$slots, "popup")
        ]),
        _: 3
      }, 8, ["color", "outlineColor", "opacity", "antialias"])
    ])
  ], 512))
}

script$4.render = render$4;

class Polygon extends Geogeometry {
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
}

let polygonsAdded = 0;
var script$3 = defineComponent({
    name: 'MapboxGeogeometryPolygon',
    components: {
        // WORKAROUND FIX NEEDED BUT CURRENTLY DOES NOT COMPILE (MAYBE PROBLEM WITH DEFINECOMPONENTS RETURN TYPE)
        MapboxGeogeometryFill: script$5
    },
    props: {
        id: {
            type: String,
            default: 'polygon'
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
        const vmb_map = inject('vmb_map', null);
        const vmb_polygon = new Deferred$1();
        const id = `${props.id}-${polygonsAdded++}`;
        const polygon = new Polygon(filterObject(Object.assign(Object.assign({}, props), { id }), [
            'id',
            'path',
            'fillColor',
            'outlineColor',
            'opacity',
            'antialias'
        ]));
        provide('vmb_polygon', vmb_polygon);
        onMounted(() => __awaiter(this, void 0, void 0, function* () {
            if (vmb_map) {
                yield mountGeogeometry(vmb_map, polygon);
                vmb_polygon.resolve(polygon);
                polygon.deferred.resolve(polygon);
            }
        }));
        watch(props, () => __awaiter(this, void 0, void 0, function* () {
            if (vmb_map) {
                polygon.updateOptions(props);
                yield updateGeogeometry(props, vmb_map, polygon);
            }
        }));
        onUnmounted(() => __awaiter(this, void 0, void 0, function* () {
            if (vmb_map) {
                const map = yield vmb_map.promise;
                map.removeLayer(polygon.id);
            }
        }));
    }
});

const _hoisted_1$2 = { ref: "features" };

function render$3(_ctx, _cache, $props, $setup, $data, $options) {
  const _component_mapbox_geogeometry_fill = resolveComponent("mapbox-geogeometry-fill");

  return (openBlock(), createElementBlock("div", _hoisted_1$2, [
    renderSlot(_ctx.$slots, "default", {}, () => [
      createVNode(_component_mapbox_geogeometry_fill, {
        color: _ctx.fillColor,
        outlineColor: _ctx.outlineColor,
        opacity: _ctx.opacity,
        antialias: _ctx.antialias
      }, {
        default: withCtx(() => [
          renderSlot(_ctx.$slots, "popup")
        ]),
        _: 3
      }, 8, ["color", "outlineColor", "opacity", "antialias"])
    ])
  ], 512))
}

script$3.render = render$3;

const rotateRectangle = (coords, angleDeg) => {
    if (coords.length !== 4)
        throw 'MapboxGeogeometryRectangle.rotateRectagle: Not a rectangle. Please supply exactly four coordinates';
    const angleRad = angleDeg * Math.PI / 180;
    const rotatedCoords = [];
    for (let i = 0; i < coords.length; i++) {
        rotatedCoords.push([
            coords[i][0] * Math.cos(angleRad) - coords[i][1] * Math.sin(angleRad),
            coords[i][0] * Math.sin(angleRad) + coords[i][1] * Math.cos(angleRad)
        ]);
    }
    return rotatedCoords;
};

class Rectangle extends Geogeometry {
    constructor(input) {
        super(input);
        this.width = input.width;
        this.height = input.height;
        this.center = input.center;
        this.rotationDeg = input.rotationDeg || 0;
    }
    updateOptions(input) {
        super.updateOptions(input);
        if (input.width)
            this.width = input.width;
        if (input.height)
            this.height = input.height;
        if (typeof input.rotationDeg === 'number' && input.rotationDeg !== this.rotationDeg)
            this.rotationDeg = input.rotationDeg;
    }
    get coordinates() {
        const xy = rotateRectangle([
            [this.width / 2, this.height / 2],
            [-this.width / 2, this.height / 2],
            [-this.width / 2, -this.height / 2],
            [this.width / 2, -this.height / 2]
        ], this.rotationDeg);
        const coords = [
            [this.center[0] + distanceToLong(xy[0][0], this.center[1]), this.center[1] + distanceToLat(xy[0][1])],
            [this.center[0] + distanceToLong(xy[1][0], this.center[1]), this.center[1] + distanceToLat(xy[1][1])],
            [this.center[0] + distanceToLong(xy[2][0], this.center[1]), this.center[1] + distanceToLat(xy[2][1])],
            [this.center[0] + distanceToLong(xy[3][0], this.center[1]), this.center[1] + distanceToLat(xy[3][1])],
        ];
        return coords;
    }
    getGeoJSON() {
        const path = [
            ...this.coordinates,
            this.coordinates[0]
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
}

let rectanglesAdded = 0;
var script$2 = defineComponent({
    name: 'MapboxGeogeometryRectangle',
    components: {
        // WORKAROUND FIX NEEDED BUT CURRENTLY DOES NOT COMPILE (MAYBE PROBLEM WITH DEFINECOMPONENTS RETURN TYPE)
        MapboxGeogeometryFill: script$5
    },
    props: {
        id: {
            type: String,
            default: 'rectangle'
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
            type: Number,
            default: 0.6
        },
        antialias: {
            type: Boolean,
            default: true
        },
        rotationDeg: {
            type: Number
        }
    },
    setup(props) {
        const vmb_map = inject('vmb_map', null);
        const vmb_rectangle = new Deferred$1();
        const id = `${props.id}-${rectanglesAdded++}`;
        const rectangle = new Rectangle(filterObject(Object.assign(Object.assign({}, props), { id }), [
            'id',
            'width',
            'height',
            'center',
            'fillColor',
            'outlineColor',
            'opacity',
            'antialias',
            'rotationDeg'
        ]));
        provide('vmb_rectangle', vmb_rectangle);
        onMounted(() => __awaiter(this, void 0, void 0, function* () {
            if (vmb_map) {
                yield mountGeogeometry(vmb_map, rectangle);
                vmb_rectangle.resolve(rectangle);
                rectangle.deferred.resolve(rectangle);
            }
        }));
        onUnmounted(() => __awaiter(this, void 0, void 0, function* () {
            if (vmb_map) {
                const map = yield vmb_map.promise;
                map.removeLayer(rectangle.id);
            }
        }));
        watch(props, () => __awaiter(this, void 0, void 0, function* () {
            if (vmb_map) {
                yield updateGeogeometry(props, vmb_map, rectangle);
            }
        }));
    }
});

const _hoisted_1$1 = { ref: "features" };

function render$2(_ctx, _cache, $props, $setup, $data, $options) {
  const _component_mapbox_geogeometry_fill = resolveComponent("mapbox-geogeometry-fill");

  return (openBlock(), createElementBlock("div", _hoisted_1$1, [
    renderSlot(_ctx.$slots, "default", {}, () => [
      createVNode(_component_mapbox_geogeometry_fill, {
        color: _ctx.fillColor,
        outlineColor: _ctx.outlineColor,
        opacity: _ctx.opacity,
        antialias: _ctx.antialias
      }, {
        default: withCtx(() => [
          renderSlot(_ctx.$slots, "popup")
        ]),
        _: 3
      }, 8, ["color", "outlineColor", "opacity", "antialias"])
    ])
  ], 512))
}

script$2.render = render$2;

const pathIsClosed = (pos) => {
    if (pos.length <= 1)
        return false;
    else {
        return pos[0][0] === pos[pos.length - 1][0] && pos[0][1] === pos[pos.length - 1][1];
    }
};
const inputIsPath = (potentialPath) => {
    if (potentialPath.length === 0)
        return true;
    if (potentialPath[0].length === 2 && typeof potentialPath[0][0] === 'number' && typeof potentialPath[0][1] === 'number')
        return true;
    return false;
};
const getCenterForCoordinates = (input, inputVisited = 0, inputCenter = [0, 0]) => {
    let visited = inputVisited;
    const center = [inputCenter[0], inputCenter[1]];
    if (inputIsPath(input)) {
        if (pathIsClosed(input))
            input.pop();
        for (const pos of input) {
            center[0] = (pos[0] + center[0] * visited) / (visited + 1);
            center[1] = (pos[1] + center[1] * visited) / (visited + 1);
            visited++;
        }
    }
    else {
        for (const pos of input) {
            const { visited: visitedLocal, center: centerLoacl } = getCenterForCoordinates(pos);
            center[0] = (center[0] * visited + centerLoacl[0] * visitedLocal) / (visitedLocal + visited);
            center[1] = (center[1] * visited + centerLoacl[1] * visitedLocal) / (visitedLocal + visited);
            visited += visitedLocal;
        }
    }
    return {
        visited,
        center
    };
};
const getCenterForFeature = (feature, inputVisited = 0, inputCenter = [0, 0]) => {
    let visited = inputVisited;
    const center = [inputCenter[0], inputCenter[1]];
    switch (feature.geometry.type) {
        case 'Polygon':
        case 'LineString': {
            const { center: centerLocal, visited: visitedLocal } = getCenterForCoordinates(feature.geometry.coordinates);
            center[0] = (center[0] * visited + centerLocal[0] * visitedLocal) / (visitedLocal + visited);
            center[1] = (center[1] * visited + centerLocal[1] * visitedLocal) / (visitedLocal + visited);
            visited += visitedLocal;
            break;
        }
    }
    return { visited, center };
};
const getCenterForFeatureCollection = (featureCollection, inputVisited = 0, inputCenter = [0, 0]) => {
    let visited = inputVisited;
    const center = [inputCenter[0], inputCenter[1]];
    for (const feature of featureCollection.features) {
        const { center: centerLocal, visited: visitedLocal } = getCenterForFeature(feature);
        center[0] = (center[0] * visited + centerLocal[0] * visitedLocal) / (visitedLocal + visited);
        center[1] = (center[1] * visited + centerLocal[1] * visitedLocal) / (visitedLocal + visited);
        visited += visitedLocal;
        break;
    }
    return { visited, center };
};

class Raw extends Geogeometry {
    constructor(input) {
        super(input);
        this.source = input.source;
    }
    updateOptions(input) {
        super.updateOptions(input);
        if (input.source)
            this.source = input.source;
    }
    get center() {
        const data = this.getGeoJSONData();
        if (!data || !data.type) {
            console.warn('Geogeometry Raw: Could not get center. Coordinates could not be obtained');
            return [0, 0];
        }
        if (data.type === 'Feature') {
            return getCenterForFeature(data).center;
        }
        if (data.type === 'FeatureCollection') {
            return getCenterForFeatureCollection(data).center;
        }
        throw new Error('Geogeometry Raw: Unknown Error getting Center');
    }
    getGeoJSON() {
        if (this.source.type === 'geojson')
            return this.source;
        else {
            return {
                type: 'geojson',
                data: this.source
            };
        }
    }
    getGeoJSONData() {
        return this.getGeoJSON().data;
    }
}

let rawDataAdded = 0;
var script$1 = defineComponent({
    name: 'MapboxGeogeometryRaw',
    components: {
        // WORKAROUND FIX NEEDED BUT CURRENTLY DOES NOT COMPILE (MAYBE PROBLEM WITH DEFINECOMPONENTS RETURN TYPE)
        MapboxGeogeometryFill: script$5
    },
    props: {
        source: {
            type: Object,
            required: true,
        },
        id: {
            type: String,
            default: 'raw'
        },
        fillColor: {
            type: String,
            default: 'red'
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
        const vmb_map = inject('vmb_map', null);
        const vmb_raw = new Deferred();
        const id = `${props.id}-${rawDataAdded++}`;
        const raw = new Raw(filterObject(Object.assign(Object.assign({}, props), { id }), [
            'source',
            'id',
            'fillColor',
            'outlineColor',
            'opacity',
            'antialias'
        ]));
        provide('vmb_raw', vmb_raw);
        onMounted(() => __awaiter(this, void 0, void 0, function* () {
            if (vmb_map) {
                yield mountGeogeometry(vmb_map, raw);
                vmb_raw.resolve(raw);
                raw.deferred.resolve(raw);
            }
        }));
        watch(props, () => __awaiter(this, void 0, void 0, function* () {
            if (vmb_map) {
                raw.updateOptions(props);
                yield updateGeogeometry(props, vmb_map, raw);
            }
        }));
        onUnmounted(() => __awaiter(this, void 0, void 0, function* () {
            if (vmb_map) {
                const map = yield vmb_map.promise;
                map.removeLayer(raw.id);
            }
        }));
    }
});

const _hoisted_1 = { ref: "features" };

function render$1(_ctx, _cache, $props, $setup, $data, $options) {
  resolveComponent("mapbox-geogeometry-fill");

  return (openBlock(), createElementBlock("div", _hoisted_1, [
    renderSlot(_ctx.$slots, "default", {}, () => [
      createCommentVNode("", true)
    ])
  ], 512))
}

script$1.render = render$1;

let linesAdded = 0;
class GeogeometryLine extends GeogeometryPaint {
    constructor(input) {
        super(input);
        this.color = input.color || '#000';
        this.opacity = typeof input.opacity === 'number' ? input.opacity : 0.6;
        if (input.geoId) {
            this.geoId = input.geoId;
        }
        if (typeof input.blur === 'number')
            this.blur = input.blur;
        if (input.cap)
            this.cap = input.cap;
        if (input.join)
            this.join = input.join;
        if (typeof input.width === 'number')
            this.width = input.width;
        if (input.translate)
            this.translate = input.translate;
        if (typeof input.offset === 'number')
            this.offset = input.offset;
        if (input.dasharray)
            this.dasharray = input.dasharray;
        if (typeof input.gapWidth === 'number')
            this.gapWidth = input.gapWidth;
        if (input.gradient)
            this.gradient = input.gradient;
        if (typeof input.miterLimit === 'number')
            this.miterLimit = input.miterLimit;
        if (typeof input.roundLimit === 'number')
            this.roundLimit = input.roundLimit;
        if (typeof input.sortKey === 'number')
            this.sortKey = input.sortKey;
        if (input.translateAnchor)
            this.translateAnchor = input.translateAnchor;
    }
    getPaint() {
        const paintRaw = {
            'line-blur': this.blur,
            'line-opacity': this.opacity,
            'line-color': this.color,
            'line-width': this.width,
            'line-translate': this.translate,
            'line-offset': this.offset,
            'line-dasharray': this.dasharray,
            'line-gap-width': this.gapWidth,
            'line-translate-anchor': this.translateAnchor,
        };
        const paint = filterObject(paintRaw);
        console.log(paint);
        return paint;
    }
    getLayout() {
        const layoutRaw = {
            'line-cap': this.cap,
            'line-join': this.join,
            'line-miter-limit': this.miterLimit,
            'line-round-limit': this.roundLimit,
            'line-sort-key': this.sortKey,
        };
        const layout = filterObject(layoutRaw);
        console.log(layout);
        return layout;
    }
    init() {
        super._init('line', linesAdded++);
        return this;
    }
    update(props, vmb_map) {
        return __awaiter(this, void 0, void 0, function* () {
            const map = yield vmb_map.promise;
            const opts = filterObject(props);
            if (this.id) {
                if (opts.color && opts.color !== this.color) {
                    map.setPaintProperty(this.id, 'line-color', opts.color);
                    this.color = opts.color;
                }
                if (typeof opts.blur === 'number' && opts.blur !== this.blur) {
                    map.setPaintProperty(this.id, 'line-blur', opts.blur);
                    this.blur = opts.blur;
                }
                if (opts.cap && opts.cap !== this.cap) {
                    map.setPaintProperty(this.id, 'line-cap', opts.cap);
                    this.cap = opts.cap;
                }
                if (opts.join && opts.join !== this.join) {
                    map.setPaintProperty(this.id, 'line-join', opts.join);
                    this.join = opts.join;
                }
                if (typeof opts.opacity === 'number' && opts.opacity !== this.opacity) {
                    map.setPaintProperty(this.id, 'line-opacity', opts.opacity);
                    this.opacity = opts.opacity;
                }
                if (typeof opts.width === 'number' && opts.width !== this.width) {
                    map.setPaintProperty(this.id, 'line-width', opts.width);
                    this.width = opts.width;
                }
                if (opts.translate && this.translate && (opts.translate[0] !== this.translate[0] || opts.translate[1] !== this.translate[1])) {
                    map.setPaintProperty(this.id, 'line-translate', opts.translate);
                    this.translate = opts.translate;
                }
                if (typeof opts.offset === 'number' && this.offset !== opts.offset) {
                    map.setPaintProperty(this.id, 'line-offset', opts.offset);
                    this.offset = opts.offset;
                }
                if (opts.dasharray && !equal(this.dasharray, opts.dasharray)) {
                    map.setPaintProperty(this.id, 'line-dasharray', opts.dasharray);
                    this.dasharray = opts.dasharray;
                }
                if (typeof opts.gapWidth === 'number' && this.gapWidth !== opts.gapWidth) {
                    map.setPaintProperty(this.id, 'line-gap-width', opts.gapWidth);
                    this.gapWidth = opts.gapWidth;
                }
                // if(opts.gradient && this.gradient !== opts.gradient){
                //   map.setPaintProperty(this.id, 'line-gradient', opts.gradient);
                //   this.gradient = opts.gradient;
                // }
                if (typeof opts.miterLimit === 'number' && this.miterLimit !== opts.miterLimit) {
                    map.setPaintProperty(this.id, 'line-miter-limit', opts.miterLimit);
                    this.miterLimit = opts.miterLimit;
                }
                if (typeof opts.roundLimit === 'number' && this.roundLimit !== opts.roundLimit) {
                    map.setPaintProperty(this.id, 'line-round-limit', opts.roundLimit);
                    this.roundLimit = opts.roundLimit;
                }
                if (typeof opts.sortKey === 'number') {
                    map.setPaintProperty(this.id, 'line-sort-key', opts.sortKey);
                    this.sortKey = opts.sortKey;
                }
                if (opts.translateAnchor && this.translateAnchor !== opts.translateAnchor) {
                    map.setPaintProperty(this.id, 'line-translate-anchor', opts.translateAnchor);
                    this.translateAnchor = opts.translateAnchor;
                }
            }
        });
    }
    getLayer() {
        if (this.id) {
            return {
                id: this.id,
                type: 'line',
                source: this.geoId,
                layout: this.getLayout(),
                paint: this.getPaint()
            };
        }
        else {
            throw new Error('Geogeometry.Paint.Line: Cannot get Layer. Not initialized');
        }
    }
}

var script = defineComponent({
    name: 'MapboxGeogeometryLine',
    props: {
        blur: {
            type: Number
        },
        cap: {
            // eslint-disable-next-line no-undef
            type: String
        },
        join: {
            // eslint-disable-next-line no-undef
            type: String
        },
        opacity: {
            type: Number,
            default: 1
        },
        color: {
            type: String,
            default: '#4668F2'
        },
        width: {
            type: Number
        },
        translate: {
            type: Array
        },
        offset: {
            type: Number
        },
        dasharray: {
            type: Array
        },
        gapWidth: {
            type: Number
        },
        // gradient: {
        //   type: String
        // },
        // miterLimit: {
        //   type: Number
        // },
        // roundLimit: {
        //   type: Number
        // },
        // sortKey: {
        //   type: Number
        // },
        // translateAnchor: {
        //   type: String as () => TranslateAnchor
        // }
    },
    setup(props) {
        const vmb_geogeometry = inject('vmb_geogeometry', null);
        const vmb_line = new Deferred();
        const vmb_map = inject('vmb_map', null);
        provide('vmb_paint', vmb_line);
        if (!vmb_geogeometry)
            throw new Error('MapboxGeogeometryLine: no geogeometry found as parent');
        const line = new GeogeometryLine(Object.assign(Object.assign({}, filterObject(props)), { geogeometry: vmb_geogeometry }));
        onMounted(() => __awaiter(this, void 0, void 0, function* () {
            if (vmb_map && vmb_geogeometry) {
                yield line.init();
                const map = yield vmb_map.promise;
                const geogeometry = yield vmb_geogeometry.promise;
                if (geogeometry && map) {
                    map.addLayer(line.getLayer());
                    vmb_line.resolve(line);
                }
            }
        }));
        watch(props, () => __awaiter(this, void 0, void 0, function* () {
            const line = yield vmb_line.promise;
            if (line && vmb_map)
                line.update(props, vmb_map);
        }));
        onUnmounted(() => __awaiter(this, void 0, void 0, function* () {
            if (vmb_map && line.id) {
                const map = yield vmb_map.promise;
                map.removeLayer(line.id);
            }
        }));
        return {};
    }
});

function render(_ctx, _cache, $props, $setup, $data, $options) {
  return (openBlock(), createElementBlock("div"))
}

script.render = render;

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
    MapboxGeocoderControl: script$g,
    MapboxMap: script$f,
    MapboxMarker: script$e,
    MapboxNavigationControl: script$d,
    MapboxPopup: script$c,
    MapboxAttributionControl: script$b,
    MapboxScaleControl: script$a,
    MapboxFullscreenControl: script$9,
    MapboxDrawControl: script$8,
    MapboxSourceGeoJson: script$7,
    MapboxGeolocateControl: script$6,
    MapboxGeogeometryCircle: script$4,
    MapboxGeogeometryPolygon: script$3,
    MapboxGeogeometryRectangle: script$2,
    MapboxGeogeometryRaw: script$1,
    MapboxGeogeometryFill: script$5,
    MapboxGeogeometryLine: script
});

// import { VueConstructor } from 'vue';
var install = (instance) => {
    Object.keys(components).forEach((name) => {
        instance.component(name, components[name]);
    });
};

class Animation {
    constructor(data, renderFunc, opts = { speed: 1 }) {
        this.renderFunc = renderFunc;
        this.running = false;
        this.progress = 0;
        this.data = data;
        this.startTime = performance.now();
        this.speed = opts.speed;
        this.pauseTime = 0;
    }
    start() {
        this.startTime = performance.now() - this.progress;
        this.internalRenderFunc(this.progress);
    }
    pause() {
        this.pauseTime += performance.now() - this.pauseTime;
        if (this.animation)
            cancelAnimationFrame(this.animation);
    }
    reset() {
        this.startTime = performance.now();
        this.progress = 0;
    }
    stop() {
        this.pause();
        this.reset();
        this.renderFunc(this.progress, this.data);
    }
    internalRenderFunc(timestamp) {
        this.progress = (timestamp - this.startTime) * this.speed;
        this.renderFunc(this.progress, this.data);
        this.animation = requestAnimationFrame(this.internalRenderFunc.bind(this));
    }
}

export { Animation, script$b as MapboxAttributionControl, script$8 as MapboxDrawControl, script$9 as MapboxFullscreenControl, script$g as MapboxGeocoderControl, script$4 as MapboxGeogeometryCircle, script$5 as MapboxGeogeometryFill, script as MapboxGeogeometryLine, script$3 as MapboxGeogeometryPolygon, script$1 as MapboxGeogeometryRaw, script$2 as MapboxGeogeometryRectangle, script$6 as MapboxGeolocateControl, script$f as MapboxMap, script$e as MapboxMarker, script$d as MapboxNavigationControl, script$c as MapboxPopup, script$a as MapboxScaleControl, script$7 as MapboxSourceGeoJson, install as default };
