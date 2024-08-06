// @ts-nocheck
import { SvelteComponent, create_slot, assign, element, set_attributes, insert, update_slot_base, get_all_dirty_from_scope, get_slot_changes, get_spread_update, transition_in, transition_out, detach, compute_rest_props, exclude_internal_props, safe_not_equal, init, listen, stop_propagation, self, trusted, bubble, run_all } from 'svelte/internal';

export interface StyledComponentEvent {
    name: string;
    passive?: boolean;
    preventDefault?: boolean;
    stopPropagation?: boolean;
    stopImmediatePropagation?: boolean;
    capture?: boolean;
    once?: boolean;
    self?: boolean;
    trusted?: boolean;
}
export function createSSC(tag: keyof HTMLElementTagNameMap, style: string, events?: StyledComponentEvent[]) {
    function createEvents(div: any, ctx: any, events: StyledComponentEvent[]) {
        return events.map((event, index) => {
            let getMe = (me) => me;
            if (event.stopPropagation) {
                getMe = (me) => stop_propagation(getMe(me));
            }
            if (event.self) {
                getMe = (me) => self(getMe(me));
            }
            if (event.trusted) {
                getMe = (me) => trusted(getMe(me));
            }

            const options = {};
            if (event.passive) {
                options.passive = true;
            }
            else if (event.passive === false) {
                options.passive = false;
            }
            if (event.once) {
                options.once = true;
            }
            if (event.capture) {
                options.capture = true;
            }

            return listen(div, event.name, getMe(ctx[3 + index]), options)
        })
    }

    function create_fragment(ctx) {
        let div;
        let current;
        let mounted;
        let dispose;
        const default_slot_template = (
            /*#slots*/
            ctx[2].default
        );
        const default_slot = create_slot(
            default_slot_template,
            ctx,
            /*$$scope*/
            ctx[1],
            null
        );
        let div_levels = [
            { style },
            /*$$restProps*/
            ctx[0]
        ];
        let div_data = {};
        for (let i = 0; i < div_levels.length; i += 1) {
            div_data = assign(div_data, div_levels[i]);
        }
        return {
            c() {
                div = element("div");
                if (default_slot) default_slot.c();
                set_attributes(div, div_data);
            },
            m(target, anchor) {
                insert(target, div, anchor);
                if (default_slot) {
                    default_slot.m(div, null);
                }
                current = true;
                if (!mounted) {
                    dispose = events ? createEvents(div, ctx, events) : [];
                    mounted = true;
                }
            },
            p(ctx2, [dirty]) {
                if (default_slot) {
                    if (default_slot.p && (!current || dirty & /*$$scope*/
                        2)) {
                        update_slot_base(
                            default_slot,
                            default_slot_template,
                            ctx2,
                            /*$$scope*/
                            ctx2[1],
                            !current ? get_all_dirty_from_scope(
                                /*$$scope*/
                                ctx2[1]
                            ) : get_slot_changes(
                                default_slot_template,
                                /*$$scope*/
                                ctx2[1],
                                dirty,
                                null
                            ),
                            null
                        );
                    }
                }
                set_attributes(div, div_data = get_spread_update(div_levels, [{ style }, dirty & /*$$restProps*/
                    1 && /*$$restProps*/
                    ctx2[0]]));
            },
            i(local) {
                if (current) return;
                transition_in(default_slot, local);
                current = true;
            },
            o(local) {
                transition_out(default_slot, local);
                current = false;
            },
            d(detaching) {
                if (detaching) {
                    detach(div);
                }
                if (default_slot) default_slot.d(detaching);
                mounted = false;
                run_all(dispose);
            }
        };
    }

    function instance($$self, $$props, $$invalidate) {
        const omit_props_names = [];
        let $$restProps = compute_rest_props($$props, omit_props_names);
        let { $$slots: slots = {}, $$scope } = $$props;
        $$self.$$set = ($$new_props) => {
            $$props = assign(assign({}, $$props), exclude_internal_props($$new_props));
            $$invalidate(0, $$restProps = compute_rest_props($$props, omit_props_names));
            if ("$$scope" in $$new_props) $$invalidate(1, $$scope = $$new_props.$$scope);
        };
        
        if(events){
            const handlers: any[] = [];
            for(let i = 0; i < events.length; i++){
                handlers.push(function(event){
                    bubble.call(this, $$self, event);
                })
            }
            return [$$restProps, $$scope, slots, ...handlers]
        }
        else{
            return [$$restProps, $$scope, slots];
        }
    }

    class StyledComponent extends SvelteComponent {
        constructor(options: { target: any; props?: any; }) {
            super();
            init(this, options, instance, create_fragment, safe_not_equal, { style: 1 });
        }
    }

    return StyledComponent
}

export {
    createSSC as styledSvelteComponent
}

export default createSSC;