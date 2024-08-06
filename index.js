import { SvelteComponent, create_slot, assign, element, set_attributes, insert, update_slot_base, get_all_dirty_from_scope, get_slot_changes, get_spread_update, transition_in, transition_out, detach, compute_rest_props, exclude_internal_props, safe_not_equal, init, listen, bubble, run_all } from 'svelte/internal';
export function createSSC(tag, generateStyle, events) {
    function createEvents(div, ctx, events) {
        return events.map((event, index) => {
            return listen(div, event, ctx[4 + index], true);
        });
    }
    function create_fragment(ctx) {
        let div;
        let current;
        let mounted;
        let dispose;
        const default_slot_template = (ctx[3].default);
        const default_slot = create_slot(default_slot_template, ctx, ctx[2], null);
        let div_levels = [
            {
                style: (ctx[0])
            },
            ctx[1]
        ];
        let div_data = {};
        for (let i = 0; i < div_levels.length; i += 1) {
            div_data = assign(div_data, div_levels[i]);
        }
        return {
            c() {
                div = element("div");
                if (default_slot)
                    default_slot.c();
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
                    if (default_slot.p && (!current || dirty &
                        4)) {
                        update_slot_base(default_slot, default_slot_template, ctx2, ctx2[2], !current ? get_all_dirty_from_scope(ctx2[2]) : get_slot_changes(default_slot_template, ctx2[2], dirty, null), null);
                    }
                }
                set_attributes(div, div_data = get_spread_update(div_levels, [
                    (!current || dirty &
                        1) && {
                        style: (ctx2[0])
                    },
                    dirty &
                        2 &&
                        ctx2[1]
                ]));
            },
            i(local) {
                if (current)
                    return;
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
                if (default_slot)
                    default_slot.d(detaching);
                mounted = false;
                run_all(dispose);
            }
        };
    }
    function instance($$self, $$props, $$invalidate) {
        let style;
        const omit_props_names = [];
        let $$restProps = compute_rest_props($$props, omit_props_names);
        let { $$slots: slots = {}, $$scope } = $$props;
        $$self.$$set = ($$new_props) => {
            $$props = assign(assign({}, $$props), exclude_internal_props($$new_props));
            $$invalidate(1, $$restProps = compute_rest_props($$props, omit_props_names));
            if ("$$scope" in $$new_props)
                $$invalidate(2, $$scope = $$new_props.$$scope);
        };
        $$self.$$.update = () => {
            $: $$invalidate(0, style = generateStyle($$restProps));
        };
        if (events) {
            const handlers = [];
            for (let i = 0; i < events.length; i++) {
                handlers.push(function (event) {
                    bubble.call(this, $$self, event);
                });
            }
            return [style, $$restProps, $$scope, slots, ...handlers];
        }
        else {
            return [style, $$restProps, $$scope, slots];
        }
    }
    class StyledComponent extends SvelteComponent {
        constructor(options) {
            super();
            init(this, options, instance, create_fragment, safe_not_equal, { style: 1 });
        }
    }
    return StyledComponent;
}
export { createSSC as styledSvelteComponent };
export default createSSC;
//# sourceMappingURL=index.js.map