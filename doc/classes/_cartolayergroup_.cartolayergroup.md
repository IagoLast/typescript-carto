[valve](../README.md) > ["cartoLayerGroup"](../modules/_cartolayergroup_.md) > [CartoLayerGroup](../classes/_cartolayergroup_.cartolayergroup.md)



# Class: CartoLayerGroup


Main Class for doing foo.

## Index

### Constructors

* [constructor](_cartolayergroup_.cartolayergroup.md#constructor)


### Accessors

* [url](_cartolayergroup_.cartolayergroup.md#url)


### Methods

* [getView](_cartolayergroup_.cartolayergroup.md#getview)
* [load](_cartolayergroup_.cartolayergroup.md#load)
* [onMapReloaded](_cartolayergroup_.cartolayergroup.md#onmapreloaded)
* [setUrl](_cartolayergroup_.cartolayergroup.md#seturl)



---
## Constructors
<a id="constructor"></a>


### ⊕ **new CartoLayerGroup**(valve: *[Valve](_valve_.valve.md)*, layers: *[Layer](_layer_.layer.md)[]*): [CartoLayerGroup](_cartolayergroup_.cartolayergroup.md)



*Defined in cartoLayerGroup.ts:14*



Class constructor
*__example__*:     
     let cartoLayerGroup = new CartoLayerGroup(valve, layers);
     foo = var;



**Parameters:**

| Param | Type | Description |
| ------ | ------ | ------ |
| valve | [Valve](_valve_.valve.md)   |  The valve to do something |
| layers | [Layer](_layer_.layer.md)[]   |  The list with the Layers grouped in the layerGroup |





**Returns:** [CartoLayerGroup](_cartolayergroup_.cartolayergroup.md)

---


## Accessors
<a id="url"></a>

###  url


geturl(): `string`


*Defined in cartoLayerGroup.ts:35*





**Returns:** `string`



___


## Methods

<a id="getview"></a>

###  getView

► **getView**(type: *"leaflet"⎮"google"*): `any`




*Defined in cartoLayerGroup.ts:50*



**Parameters:**

| Param | Type | Description |
| ------ | ------ | ------ |
| type | "leaflet"⎮"google"   |  - |





**Returns:** `any`





___

<a id="load"></a>

###  load

► **load**(): `Promise`.<[CartoLayerGroup](_cartolayergroup_.cartolayergroup.md)>




*Defined in cartoLayerGroup.ts:44*





**Returns:** `Promise`.<[CartoLayerGroup](_cartolayergroup_.cartolayergroup.md)>





___

<a id="onmapreloaded"></a>

###  onMapReloaded

► **onMapReloaded**(): `Promise`.<`void`>




*Defined in cartoLayerGroup.ts:55*





**Returns:** `Promise`.<`void`>





___

<a id="seturl"></a>

###  setUrl

► **setUrl**(url: *`string`*): [CartoLayerGroup](_cartolayergroup_.cartolayergroup.md)




*Defined in cartoLayerGroup.ts:39*



**Parameters:**

| Param | Type | Description |
| ------ | ------ | ------ |
| url | `string`   |  - |





**Returns:** [CartoLayerGroup](_cartolayergroup_.cartolayergroup.md)





___


