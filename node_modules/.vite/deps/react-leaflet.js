import {
  require_react_dom
} from "./chunk-TYILIMWK.js";
import {
  require_react
} from "./chunk-CANBAPAS.js";
import {
  require_leaflet_src
} from "./chunk-BBSAS6O5.js";
import {
  __toESM
} from "./chunk-5WRI5ZAA.js";

// node_modules/@react-leaflet/core/lib/attribution.js
var import_react = __toESM(require_react(), 1);
function useAttribution(map, attribution) {
  const attributionRef = (0, import_react.useRef)(attribution);
  (0, import_react.useEffect)(function updateAttribution() {
    if (attribution !== attributionRef.current && map.attributionControl != null) {
      if (attributionRef.current != null) {
        map.attributionControl.removeAttribution(attributionRef.current);
      }
      if (attribution != null) {
        map.attributionControl.addAttribution(attribution);
      }
    }
    attributionRef.current = attribution;
  }, [
    map,
    attribution
  ]);
}

// node_modules/@react-leaflet/core/lib/circle.js
function updateCircle(layer, props, prevProps) {
  if (props.center !== prevProps.center) {
    layer.setLatLng(props.center);
  }
  if (props.radius != null && props.radius !== prevProps.radius) {
    layer.setRadius(props.radius);
  }
}

// node_modules/@react-leaflet/core/lib/component.js
var import_react3 = __toESM(require_react(), 1);
var import_react_dom = __toESM(require_react_dom(), 1);

// node_modules/@react-leaflet/core/lib/context.js
var import_react2 = __toESM(require_react(), 1);
var CONTEXT_VERSION = 1;
function createLeafletContext(map) {
  return Object.freeze({
    __version: CONTEXT_VERSION,
    map
  });
}
function extendContext(source, extra) {
  return Object.freeze({
    ...source,
    ...extra
  });
}
var LeafletContext = (0, import_react2.createContext)(null);
var LeafletProvider = LeafletContext.Provider;
function useLeafletContext() {
  const context = (0, import_react2.useContext)(LeafletContext);
  if (context == null) {
    throw new Error("No context provided: useLeafletContext() can only be used in a descendant of <MapContainer>");
  }
  return context;
}

// node_modules/@react-leaflet/core/lib/component.js
function createContainerComponent(useElement) {
  function ContainerComponent(props, forwardedRef) {
    const { instance, context } = useElement(props).current;
    (0, import_react3.useImperativeHandle)(forwardedRef, () => instance);
    return props.children == null ? null : import_react3.default.createElement(LeafletProvider, {
      value: context
    }, props.children);
  }
  return (0, import_react3.forwardRef)(ContainerComponent);
}
function createDivOverlayComponent(useElement) {
  function OverlayComponent(props, forwardedRef) {
    const [isOpen, setOpen] = (0, import_react3.useState)(false);
    const { instance } = useElement(props, setOpen).current;
    (0, import_react3.useImperativeHandle)(forwardedRef, () => instance);
    (0, import_react3.useEffect)(function updateOverlay() {
      if (isOpen) {
        instance.update();
      }
    }, [
      instance,
      isOpen,
      props.children
    ]);
    const contentNode = instance._contentNode;
    return contentNode ? (0, import_react_dom.createPortal)(props.children, contentNode) : null;
  }
  return (0, import_react3.forwardRef)(OverlayComponent);
}
function createLeafComponent(useElement) {
  function LeafComponent(props, forwardedRef) {
    const { instance } = useElement(props).current;
    (0, import_react3.useImperativeHandle)(forwardedRef, () => instance);
    return null;
  }
  return (0, import_react3.forwardRef)(LeafComponent);
}

// node_modules/@react-leaflet/core/lib/control.js
var import_react4 = __toESM(require_react(), 1);
function createControlHook(useElement) {
  return function useLeafletControl(props) {
    const context = useLeafletContext();
    const elementRef = useElement(props, context);
    const { instance } = elementRef.current;
    const positionRef = (0, import_react4.useRef)(props.position);
    const { position } = props;
    (0, import_react4.useEffect)(function addControl() {
      instance.addTo(context.map);
      return function removeControl() {
        instance.remove();
      };
    }, [
      context.map,
      instance
    ]);
    (0, import_react4.useEffect)(function updateControl() {
      if (position != null && position !== positionRef.current) {
        instance.setPosition(position);
        positionRef.current = position;
      }
    }, [
      instance,
      position
    ]);
    return elementRef;
  };
}

// node_modules/@react-leaflet/core/lib/events.js
var import_react5 = __toESM(require_react(), 1);
function useEventHandlers(element, eventHandlers) {
  const eventHandlersRef = (0, import_react5.useRef)();
  (0, import_react5.useEffect)(function addEventHandlers() {
    if (eventHandlers != null) {
      element.instance.on(eventHandlers);
    }
    eventHandlersRef.current = eventHandlers;
    return function removeEventHandlers() {
      if (eventHandlersRef.current != null) {
        element.instance.off(eventHandlersRef.current);
      }
      eventHandlersRef.current = null;
    };
  }, [
    element,
    eventHandlers
  ]);
}

// node_modules/@react-leaflet/core/lib/pane.js
function withPane(props, context) {
  const pane = props.pane ?? context.pane;
  return pane ? {
    ...props,
    pane
  } : props;
}

// node_modules/@react-leaflet/core/lib/div-overlay.js
function createDivOverlayHook(useElement, useLifecycle) {
  return function useDivOverlay(props, setOpen) {
    const context = useLeafletContext();
    const elementRef = useElement(withPane(props, context), context);
    useAttribution(context.map, props.attribution);
    useEventHandlers(elementRef.current, props.eventHandlers);
    useLifecycle(elementRef.current, context, props, setOpen);
    return elementRef;
  };
}

// node_modules/@react-leaflet/core/lib/dom.js
var import_leaflet = __toESM(require_leaflet_src(), 1);
function splitClassName(className) {
  return className.split(" ").filter(Boolean);
}
function addClassName(element, className) {
  splitClassName(className).forEach((cls) => {
    import_leaflet.DomUtil.addClass(element, cls);
  });
}

// node_modules/@react-leaflet/core/lib/element.js
var import_react6 = __toESM(require_react(), 1);
function createElementObject(instance, context, container) {
  return Object.freeze({
    instance,
    context,
    container
  });
}
function createElementHook(createElement, updateElement) {
  if (updateElement == null) {
    return function useImmutableLeafletElement(props, context) {
      const elementRef = (0, import_react6.useRef)();
      if (!elementRef.current) elementRef.current = createElement(props, context);
      return elementRef;
    };
  }
  return function useMutableLeafletElement(props, context) {
    const elementRef = (0, import_react6.useRef)();
    if (!elementRef.current) elementRef.current = createElement(props, context);
    const propsRef = (0, import_react6.useRef)(props);
    const { instance } = elementRef.current;
    (0, import_react6.useEffect)(function updateElementProps() {
      if (propsRef.current !== props) {
        updateElement(instance, props, propsRef.current);
        propsRef.current = props;
      }
    }, [
      instance,
      props,
      context
    ]);
    return elementRef;
  };
}

// node_modules/@react-leaflet/core/lib/layer.js
var import_react7 = __toESM(require_react(), 1);
function useLayerLifecycle(element, context) {
  (0, import_react7.useEffect)(function addLayer() {
    const container = context.layerContainer ?? context.map;
    container.addLayer(element.instance);
    return function removeLayer() {
      var _a;
      (_a = context.layerContainer) == null ? void 0 : _a.removeLayer(element.instance);
      context.map.removeLayer(element.instance);
    };
  }, [
    context,
    element
  ]);
}
function createLayerHook(useElement) {
  return function useLayer(props) {
    const context = useLeafletContext();
    const elementRef = useElement(withPane(props, context), context);
    useAttribution(context.map, props.attribution);
    useEventHandlers(elementRef.current, props.eventHandlers);
    useLayerLifecycle(elementRef.current, context);
    return elementRef;
  };
}

// node_modules/@react-leaflet/core/lib/path.js
var import_react8 = __toESM(require_react(), 1);
function usePathOptions(element, props) {
  const optionsRef = (0, import_react8.useRef)();
  (0, import_react8.useEffect)(function updatePathOptions() {
    if (props.pathOptions !== optionsRef.current) {
      const options = props.pathOptions ?? {};
      element.instance.setStyle(options);
      optionsRef.current = options;
    }
  }, [
    element,
    props
  ]);
}
function createPathHook(useElement) {
  return function usePath(props) {
    const context = useLeafletContext();
    const elementRef = useElement(withPane(props, context), context);
    useEventHandlers(elementRef.current, props.eventHandlers);
    useLayerLifecycle(elementRef.current, context);
    usePathOptions(elementRef.current, props);
    return elementRef;
  };
}

// node_modules/@react-leaflet/core/lib/generic.js
function createControlComponent(createInstance) {
  function createElement(props, context) {
    return createElementObject(createInstance(props), context);
  }
  const useElement = createElementHook(createElement);
  const useControl = createControlHook(useElement);
  return createLeafComponent(useControl);
}
function createLayerComponent(createElement, updateElement) {
  const useElement = createElementHook(createElement, updateElement);
  const useLayer = createLayerHook(useElement);
  return createContainerComponent(useLayer);
}
function createOverlayComponent(createElement, useLifecycle) {
  const useElement = createElementHook(createElement);
  const useOverlay = createDivOverlayHook(useElement, useLifecycle);
  return createDivOverlayComponent(useOverlay);
}
function createPathComponent(createElement, updateElement) {
  const useElement = createElementHook(createElement, updateElement);
  const usePath = createPathHook(useElement);
  return createContainerComponent(usePath);
}
function createTileLayerComponent(createElement, updateElement) {
  const useElement = createElementHook(createElement, updateElement);
  const useLayer = createLayerHook(useElement);
  return createLeafComponent(useLayer);
}

// node_modules/@react-leaflet/core/lib/grid-layer.js
function updateGridLayer(layer, props, prevProps) {
  const { opacity, zIndex } = props;
  if (opacity != null && opacity !== prevProps.opacity) {
    layer.setOpacity(opacity);
  }
  if (zIndex != null && zIndex !== prevProps.zIndex) {
    layer.setZIndex(zIndex);
  }
}

// node_modules/@react-leaflet/core/lib/media-overlay.js
var import_leaflet2 = __toESM(require_leaflet_src(), 1);
function updateMediaOverlay(overlay, props, prevProps) {
  if (props.bounds instanceof import_leaflet2.LatLngBounds && props.bounds !== prevProps.bounds) {
    overlay.setBounds(props.bounds);
  }
  if (props.opacity != null && props.opacity !== prevProps.opacity) {
    overlay.setOpacity(props.opacity);
  }
  if (props.zIndex != null && props.zIndex !== prevProps.zIndex) {
    overlay.setZIndex(props.zIndex);
  }
}

// node_modules/react-leaflet/lib/hooks.js
var import_react9 = __toESM(require_react(), 1);
function useMap() {
  return useLeafletContext().map;
}
function useMapEvent(type, handler) {
  const map = useMap();
  (0, import_react9.useEffect)(function addMapEventHandler() {
    map.on(type, handler);
    return function removeMapEventHandler() {
      map.off(type, handler);
    };
  }, [
    map,
    type,
    handler
  ]);
  return map;
}
function useMapEvents(handlers) {
  const map = useMap();
  (0, import_react9.useEffect)(function addMapEventHandlers() {
    map.on(handlers);
    return function removeMapEventHandlers() {
      map.off(handlers);
    };
  }, [
    map,
    handlers
  ]);
  return map;
}

// node_modules/react-leaflet/lib/AttributionControl.js
var import_leaflet3 = __toESM(require_leaflet_src(), 1);
var AttributionControl = createControlComponent(function createAttributionControl(props) {
  return new import_leaflet3.Control.Attribution(props);
});

// node_modules/react-leaflet/lib/Circle.js
var import_leaflet4 = __toESM(require_leaflet_src(), 1);
var Circle = createPathComponent(function createCircle({ center, children: _c, ...options }, ctx) {
  const circle = new import_leaflet4.Circle(center, options);
  return createElementObject(circle, extendContext(ctx, {
    overlayContainer: circle
  }));
}, updateCircle);

// node_modules/react-leaflet/lib/CircleMarker.js
var import_leaflet5 = __toESM(require_leaflet_src(), 1);
var CircleMarker = createPathComponent(function createCircleMarker({ center, children: _c, ...options }, ctx) {
  const marker = new import_leaflet5.CircleMarker(center, options);
  return createElementObject(marker, extendContext(ctx, {
    overlayContainer: marker
  }));
}, updateCircle);

// node_modules/react-leaflet/lib/FeatureGroup.js
var import_leaflet6 = __toESM(require_leaflet_src(), 1);
var FeatureGroup = createPathComponent(function createFeatureGroup({ children: _c, ...options }, ctx) {
  const group = new import_leaflet6.FeatureGroup([], options);
  return createElementObject(group, extendContext(ctx, {
    layerContainer: group,
    overlayContainer: group
  }));
});

// node_modules/react-leaflet/lib/GeoJSON.js
var import_leaflet7 = __toESM(require_leaflet_src(), 1);
var GeoJSON = createPathComponent(function createGeoJSON({ data, ...options }, ctx) {
  const geoJSON = new import_leaflet7.GeoJSON(data, options);
  return createElementObject(geoJSON, extendContext(ctx, {
    overlayContainer: geoJSON
  }));
}, function updateGeoJSON(layer, props, prevProps) {
  if (props.style !== prevProps.style) {
    if (props.style == null) {
      layer.resetStyle();
    } else {
      layer.setStyle(props.style);
    }
  }
});

// node_modules/react-leaflet/lib/ImageOverlay.js
var import_leaflet8 = __toESM(require_leaflet_src(), 1);
var ImageOverlay = createLayerComponent(function createImageOveraly({ bounds, url, ...options }, ctx) {
  const overlay = new import_leaflet8.ImageOverlay(url, bounds, options);
  return createElementObject(overlay, extendContext(ctx, {
    overlayContainer: overlay
  }));
}, function updateImageOverlay(overlay, props, prevProps) {
  updateMediaOverlay(overlay, props, prevProps);
  if (props.bounds !== prevProps.bounds) {
    const bounds = props.bounds instanceof import_leaflet8.LatLngBounds ? props.bounds : new import_leaflet8.LatLngBounds(props.bounds);
    overlay.setBounds(bounds);
  }
  if (props.url !== prevProps.url) {
    overlay.setUrl(props.url);
  }
});

// node_modules/react-leaflet/lib/LayerGroup.js
var import_leaflet9 = __toESM(require_leaflet_src(), 1);
var LayerGroup = createLayerComponent(function createLayerGroup({ children: _c, ...options }, ctx) {
  const group = new import_leaflet9.LayerGroup([], options);
  return createElementObject(group, extendContext(ctx, {
    layerContainer: group
  }));
});

// node_modules/react-leaflet/lib/LayersControl.js
var import_leaflet10 = __toESM(require_leaflet_src(), 1);
var import_react10 = __toESM(require_react(), 1);
var useLayersControlElement = createElementHook(function createLayersControl({ children: _c, ...options }, ctx) {
  const control = new import_leaflet10.Control.Layers(void 0, void 0, options);
  return createElementObject(control, extendContext(ctx, {
    layersControl: control
  }));
}, function updateLayersControl(control, props, prevProps) {
  if (props.collapsed !== prevProps.collapsed) {
    if (props.collapsed === true) {
      control.collapse();
    } else {
      control.expand();
    }
  }
});
var useLayersControl = createControlHook(useLayersControlElement);
var LayersControl = createContainerComponent(useLayersControl);
function createControlledLayer(addLayerToControl) {
  return function ControlledLayer(props) {
    const parentContext = useLeafletContext();
    const propsRef = (0, import_react10.useRef)(props);
    const [layer, setLayer] = (0, import_react10.useState)(null);
    const { layersControl, map } = parentContext;
    const addLayer = (0, import_react10.useCallback)((layerToAdd) => {
      if (layersControl != null) {
        if (propsRef.current.checked) {
          map.addLayer(layerToAdd);
        }
        addLayerToControl(layersControl, layerToAdd, propsRef.current.name);
        setLayer(layerToAdd);
      }
    }, [
      layersControl,
      map
    ]);
    const removeLayer = (0, import_react10.useCallback)((layerToRemove) => {
      layersControl == null ? void 0 : layersControl.removeLayer(layerToRemove);
      setLayer(null);
    }, [
      layersControl
    ]);
    const context = (0, import_react10.useMemo)(() => {
      return extendContext(parentContext, {
        layerContainer: {
          addLayer,
          removeLayer
        }
      });
    }, [
      parentContext,
      addLayer,
      removeLayer
    ]);
    (0, import_react10.useEffect)(() => {
      if (layer !== null && propsRef.current !== props) {
        if (props.checked === true && (propsRef.current.checked == null || propsRef.current.checked === false)) {
          map.addLayer(layer);
        } else if (propsRef.current.checked === true && (props.checked == null || props.checked === false)) {
          map.removeLayer(layer);
        }
        propsRef.current = props;
      }
    });
    return props.children ? import_react10.default.createElement(LeafletProvider, {
      value: context
    }, props.children) : null;
  };
}
LayersControl.BaseLayer = createControlledLayer(function addBaseLayer(layersControl, layer, name) {
  layersControl.addBaseLayer(layer, name);
});
LayersControl.Overlay = createControlledLayer(function addOverlay(layersControl, layer, name) {
  layersControl.addOverlay(layer, name);
});

// node_modules/react-leaflet/lib/MapContainer.js
var import_leaflet11 = __toESM(require_leaflet_src(), 1);
var import_react11 = __toESM(require_react(), 1);
function _extends() {
  _extends = Object.assign || function(target) {
    for (var i = 1; i < arguments.length; i++) {
      var source = arguments[i];
      for (var key in source) {
        if (Object.prototype.hasOwnProperty.call(source, key)) {
          target[key] = source[key];
        }
      }
    }
    return target;
  };
  return _extends.apply(this, arguments);
}
function MapContainerComponent({ bounds, boundsOptions, center, children, className, id, placeholder, style, whenReady, zoom, ...options }, forwardedRef) {
  const [props] = (0, import_react11.useState)({
    className,
    id,
    style
  });
  const [context, setContext] = (0, import_react11.useState)(null);
  (0, import_react11.useImperativeHandle)(forwardedRef, () => (context == null ? void 0 : context.map) ?? null, [
    context
  ]);
  const mapRef = (0, import_react11.useCallback)((node) => {
    if (node !== null && context === null) {
      const map = new import_leaflet11.Map(node, options);
      if (center != null && zoom != null) {
        map.setView(center, zoom);
      } else if (bounds != null) {
        map.fitBounds(bounds, boundsOptions);
      }
      if (whenReady != null) {
        map.whenReady(whenReady);
      }
      setContext(createLeafletContext(map));
    }
  }, []);
  (0, import_react11.useEffect)(() => {
    return () => {
      context == null ? void 0 : context.map.remove();
    };
  }, [
    context
  ]);
  const contents = context ? import_react11.default.createElement(LeafletProvider, {
    value: context
  }, children) : placeholder ?? null;
  return import_react11.default.createElement("div", _extends({}, props, {
    ref: mapRef
  }), contents);
}
var MapContainer = (0, import_react11.forwardRef)(MapContainerComponent);

// node_modules/react-leaflet/lib/Marker.js
var import_leaflet12 = __toESM(require_leaflet_src(), 1);
var Marker = createLayerComponent(function createMarker({ position, ...options }, ctx) {
  const marker = new import_leaflet12.Marker(position, options);
  return createElementObject(marker, extendContext(ctx, {
    overlayContainer: marker
  }));
}, function updateMarker(marker, props, prevProps) {
  if (props.position !== prevProps.position) {
    marker.setLatLng(props.position);
  }
  if (props.icon != null && props.icon !== prevProps.icon) {
    marker.setIcon(props.icon);
  }
  if (props.zIndexOffset != null && props.zIndexOffset !== prevProps.zIndexOffset) {
    marker.setZIndexOffset(props.zIndexOffset);
  }
  if (props.opacity != null && props.opacity !== prevProps.opacity) {
    marker.setOpacity(props.opacity);
  }
  if (marker.dragging != null && props.draggable !== prevProps.draggable) {
    if (props.draggable === true) {
      marker.dragging.enable();
    } else {
      marker.dragging.disable();
    }
  }
});

// node_modules/react-leaflet/lib/Pane.js
var import_react12 = __toESM(require_react(), 1);
var import_react_dom2 = __toESM(require_react_dom(), 1);
var DEFAULT_PANES = [
  "mapPane",
  "markerPane",
  "overlayPane",
  "popupPane",
  "shadowPane",
  "tilePane",
  "tooltipPane"
];
function omitPane(obj, pane) {
  const { [pane]: _p, ...others } = obj;
  return others;
}
function createPane(name, props, context) {
  if (DEFAULT_PANES.indexOf(name) !== -1) {
    throw new Error(`You must use a unique name for a pane that is not a default Leaflet pane: ${name}`);
  }
  if (context.map.getPane(name) != null) {
    throw new Error(`A pane with this name already exists: ${name}`);
  }
  const parentPaneName = props.pane ?? context.pane;
  const parentPane = parentPaneName ? context.map.getPane(parentPaneName) : void 0;
  const element = context.map.createPane(name, parentPane);
  if (props.className != null) {
    addClassName(element, props.className);
  }
  if (props.style != null) {
    Object.keys(props.style).forEach((key) => {
      element.style[key] = props.style[key];
    });
  }
  return element;
}
function PaneComponent(props, forwardedRef) {
  const [paneName] = (0, import_react12.useState)(props.name);
  const [paneElement, setPaneElement] = (0, import_react12.useState)(null);
  (0, import_react12.useImperativeHandle)(forwardedRef, () => paneElement, [
    paneElement
  ]);
  const context = useLeafletContext();
  const newContext = (0, import_react12.useMemo)(() => ({
    ...context,
    pane: paneName
  }), [
    context
  ]);
  (0, import_react12.useEffect)(() => {
    setPaneElement(createPane(paneName, props, context));
    return function removeCreatedPane() {
      var _a;
      const pane = context.map.getPane(paneName);
      (_a = pane == null ? void 0 : pane.remove) == null ? void 0 : _a.call(pane);
      if (context.map._panes != null) {
        context.map._panes = omitPane(context.map._panes, paneName);
        context.map._paneRenderers = omitPane(
          // @ts-ignore map internals
          context.map._paneRenderers,
          paneName
        );
      }
    };
  }, []);
  return props.children != null && paneElement != null ? (0, import_react_dom2.createPortal)(import_react12.default.createElement(LeafletProvider, {
    value: newContext
  }, props.children), paneElement) : null;
}
var Pane = (0, import_react12.forwardRef)(PaneComponent);

// node_modules/react-leaflet/lib/Polygon.js
var import_leaflet13 = __toESM(require_leaflet_src(), 1);
var Polygon = createPathComponent(function createPolygon({ positions, ...options }, ctx) {
  const polygon = new import_leaflet13.Polygon(positions, options);
  return createElementObject(polygon, extendContext(ctx, {
    overlayContainer: polygon
  }));
}, function updatePolygon(layer, props, prevProps) {
  if (props.positions !== prevProps.positions) {
    layer.setLatLngs(props.positions);
  }
});

// node_modules/react-leaflet/lib/Polyline.js
var import_leaflet14 = __toESM(require_leaflet_src(), 1);
var Polyline = createPathComponent(function createPolyline({ positions, ...options }, ctx) {
  const polyline = new import_leaflet14.Polyline(positions, options);
  return createElementObject(polyline, extendContext(ctx, {
    overlayContainer: polyline
  }));
}, function updatePolyline(layer, props, prevProps) {
  if (props.positions !== prevProps.positions) {
    layer.setLatLngs(props.positions);
  }
});

// node_modules/react-leaflet/lib/Popup.js
var import_leaflet15 = __toESM(require_leaflet_src(), 1);
var import_react13 = __toESM(require_react(), 1);
var Popup = createOverlayComponent(function createPopup(props, context) {
  const popup = new import_leaflet15.Popup(props, context.overlayContainer);
  return createElementObject(popup, context);
}, function usePopupLifecycle(element, context, { position }, setOpen) {
  (0, import_react13.useEffect)(function addPopup() {
    const { instance } = element;
    function onPopupOpen(event) {
      if (event.popup === instance) {
        instance.update();
        setOpen(true);
      }
    }
    function onPopupClose(event) {
      if (event.popup === instance) {
        setOpen(false);
      }
    }
    context.map.on({
      popupopen: onPopupOpen,
      popupclose: onPopupClose
    });
    if (context.overlayContainer == null) {
      if (position != null) {
        instance.setLatLng(position);
      }
      instance.openOn(context.map);
    } else {
      context.overlayContainer.bindPopup(instance);
    }
    return function removePopup() {
      var _a;
      context.map.off({
        popupopen: onPopupOpen,
        popupclose: onPopupClose
      });
      (_a = context.overlayContainer) == null ? void 0 : _a.unbindPopup();
      context.map.removeLayer(instance);
    };
  }, [
    element,
    context,
    setOpen,
    position
  ]);
});

// node_modules/react-leaflet/lib/Rectangle.js
var import_leaflet16 = __toESM(require_leaflet_src(), 1);
var Rectangle = createPathComponent(function createRectangle({ bounds, ...options }, ctx) {
  const rectangle = new import_leaflet16.Rectangle(bounds, options);
  return createElementObject(rectangle, extendContext(ctx, {
    overlayContainer: rectangle
  }));
}, function updateRectangle(layer, props, prevProps) {
  if (props.bounds !== prevProps.bounds) {
    layer.setBounds(props.bounds);
  }
});

// node_modules/react-leaflet/lib/ScaleControl.js
var import_leaflet17 = __toESM(require_leaflet_src(), 1);
var ScaleControl = createControlComponent(function createScaleControl(props) {
  return new import_leaflet17.Control.Scale(props);
});

// node_modules/react-leaflet/lib/SVGOverlay.js
var import_leaflet18 = __toESM(require_leaflet_src(), 1);
var import_react14 = __toESM(require_react(), 1);
var import_react_dom3 = __toESM(require_react_dom(), 1);
var useSVGOverlayElement = createElementHook(function createSVGOverlay(props, context) {
  const { attributes, bounds, ...options } = props;
  const container = document.createElementNS("http://www.w3.org/2000/svg", "svg");
  container.setAttribute("xmlns", "http://www.w3.org/2000/svg");
  if (attributes != null) {
    Object.keys(attributes).forEach((name) => {
      container.setAttribute(name, attributes[name]);
    });
  }
  const overlay = new import_leaflet18.SVGOverlay(container, bounds, options);
  return createElementObject(overlay, context, container);
}, updateMediaOverlay);
var useSVGOverlay = createLayerHook(useSVGOverlayElement);
function SVGOverlayComponent({ children, ...options }, forwardedRef) {
  const { instance, container } = useSVGOverlay(options).current;
  (0, import_react14.useImperativeHandle)(forwardedRef, () => instance);
  return container == null || children == null ? null : (0, import_react_dom3.createPortal)(children, container);
}
var SVGOverlay = (0, import_react14.forwardRef)(SVGOverlayComponent);

// node_modules/react-leaflet/lib/TileLayer.js
var import_leaflet19 = __toESM(require_leaflet_src(), 1);
var TileLayer = createTileLayerComponent(function createTileLayer({ url, ...options }, context) {
  const layer = new import_leaflet19.TileLayer(url, withPane(options, context));
  return createElementObject(layer, context);
}, function updateTileLayer(layer, props, prevProps) {
  updateGridLayer(layer, props, prevProps);
  const { url } = props;
  if (url != null && url !== prevProps.url) {
    layer.setUrl(url);
  }
});

// node_modules/react-leaflet/lib/Tooltip.js
var import_leaflet20 = __toESM(require_leaflet_src(), 1);
var import_react15 = __toESM(require_react(), 1);
var Tooltip = createOverlayComponent(function createTooltip(props, context) {
  const tooltip = new import_leaflet20.Tooltip(props, context.overlayContainer);
  return createElementObject(tooltip, context);
}, function useTooltipLifecycle(element, context, { position }, setOpen) {
  (0, import_react15.useEffect)(function addTooltip() {
    const container = context.overlayContainer;
    if (container == null) {
      return;
    }
    const { instance } = element;
    const onTooltipOpen = (event) => {
      if (event.tooltip === instance) {
        if (position != null) {
          instance.setLatLng(position);
        }
        instance.update();
        setOpen(true);
      }
    };
    const onTooltipClose = (event) => {
      if (event.tooltip === instance) {
        setOpen(false);
      }
    };
    container.on({
      tooltipopen: onTooltipOpen,
      tooltipclose: onTooltipClose
    });
    container.bindTooltip(instance);
    return function removeTooltip() {
      container.off({
        tooltipopen: onTooltipOpen,
        tooltipclose: onTooltipClose
      });
      if (container._map != null) {
        container.unbindTooltip();
      }
    };
  }, [
    element,
    context,
    setOpen,
    position
  ]);
});

// node_modules/react-leaflet/lib/VideoOverlay.js
var import_leaflet21 = __toESM(require_leaflet_src(), 1);
var VideoOverlay = createLayerComponent(function createVideoOverlay({ bounds, url, ...options }, ctx) {
  var _a;
  const overlay = new import_leaflet21.VideoOverlay(url, bounds, options);
  if (options.play === true) {
    (_a = overlay.getElement()) == null ? void 0 : _a.play();
  }
  return createElementObject(overlay, extendContext(ctx, {
    overlayContainer: overlay
  }));
}, function updateVideoOverlay(overlay, props, prevProps) {
  updateMediaOverlay(overlay, props, prevProps);
  if (typeof props.url === "string" && props.url !== prevProps.url) {
    overlay.setUrl(props.url);
  }
  const video = overlay.getElement();
  if (video != null) {
    if (props.play === true && !prevProps.play) {
      video.play();
    } else if (!props.play && prevProps.play === true) {
      video.pause();
    }
  }
});

// node_modules/react-leaflet/lib/WMSTileLayer.js
var import_leaflet22 = __toESM(require_leaflet_src(), 1);
var WMSTileLayer = createTileLayerComponent(function createWMSTileLayer({ eventHandlers: _eh, params = {}, url, ...options }, context) {
  const layer = new import_leaflet22.TileLayer.WMS(url, {
    ...params,
    ...withPane(options, context)
  });
  return createElementObject(layer, context);
}, function updateWMSTileLayer(layer, props, prevProps) {
  updateGridLayer(layer, props, prevProps);
  if (props.params != null && props.params !== prevProps.params) {
    layer.setParams(props.params);
  }
});

// node_modules/react-leaflet/lib/ZoomControl.js
var import_leaflet23 = __toESM(require_leaflet_src(), 1);
var ZoomControl = createControlComponent(function createZoomControl(props) {
  return new import_leaflet23.Control.Zoom(props);
});
export {
  AttributionControl,
  Circle,
  CircleMarker,
  FeatureGroup,
  GeoJSON,
  ImageOverlay,
  LayerGroup,
  LayersControl,
  MapContainer,
  Marker,
  Pane,
  Polygon,
  Polyline,
  Popup,
  Rectangle,
  SVGOverlay,
  ScaleControl,
  TileLayer,
  Tooltip,
  VideoOverlay,
  WMSTileLayer,
  ZoomControl,
  useMap,
  useMapEvent,
  useMapEvents
};
//# sourceMappingURL=react-leaflet.js.map
