import { Component, Host, h, Element } from '@stencil/core';
import {computePosition, offset, arrow, flip, shift, MiddlewareData} from '@floating-ui/dom';

@Component({
  tag: 'my-component',
  styleUrl: 'my-component.css',
})
export class MyComponent {
  private targetElem: HTMLElement;
  private tooltipElem: HTMLElement;
  private arrowElem: HTMLElement;
  @Element() el!: HTMLMyComponentElement;

  private initializeTooltip() {
    this.targetElem = this.el.querySelector('.tooltip--target');
    this.tooltipElem = this.el.querySelector('.tooltip--floating');
    this.arrowElem = this.el.querySelector('.tooltip--content__arrow');

    computePosition(this.targetElem, this.tooltipElem, {
      middleware: [offset(10), flip(), shift({padding: 5}), arrow({ element: this.arrowElem})],
      placement: 'bottom',
    }).then(({x, y, placement, middlewareData}) => {
      Object.assign(this.tooltipElem.style, {
        left: `${x}px`,
        top: `${y}px`,
      });

      this.initializeTooltipArrow(middlewareData, placement);
    });
  }

  private initializeTooltipArrow(middlewareData: MiddlewareData, placement: string) {
    const {x: arrowX, y: arrowY} = middlewareData.arrow;
      
      const placementPos = placement.split('-')[0];
      const staticSide = {
        top: 'bottom',
        right: 'left',
        bottom: 'top',
        left: 'right',
      }[placementPos];

      const staticSidePosition = {
        top: '-10px',
        right: '-6px',
        bottom: '-10px',
        left: '-6px',
      }[placementPos];
     
      const rotationDeg = {
        top: -90,
        right: 0,
        bottom: 90,
        left: 180,
      }[placementPos];
      
      Object.assign(this.arrowElem.style, {
        left: arrowX != null ? `${arrowX}px` : '',
        top: arrowY != null ? `${arrowY}px` : '',
        right: '',
        bottom: '',
        [staticSide]: staticSidePosition,
        transform: `rotate(${rotationDeg}deg)`,
      });
  }

  componentDidRender() {
    this.initializeTooltip();
  }

  render() {
    return (
      <Host class={{
        'tooltip': true,
      }}>
        <div class="tooltip--target">
          <slot></slot>
        </div>
        <div class="tooltip--floating">
          <div class="tooltip--content">
            <slot name="content"></slot>
            <div class="tooltip--content__arrow"></div>
          </div>
        </div>
      </Host>
    )
  }
}
