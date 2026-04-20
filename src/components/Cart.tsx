import { motion, AnimatePresence } from 'framer-motion';
import { X, ShoppingCart, Trash2, Plus, Minus, Loader2 } from 'lucide-react';
import { useCart, useCurrency, formatPrice, DEFAULT_CURRENCY } from '@/integrations';
import { Image } from '@/components/ui/image';

export default function Cart() {
  const { items, itemCount, totalPrice, isOpen, isCheckingOut, actions } = useCart();
  const { currency } = useCurrency();

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={actions.closeCart}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50"
          />

          {/* Cart Drawer */}
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 30, stiffness: 300 }}
            className="fixed right-0 top-0 bottom-0 w-full max-w-md bg-gradient-to-br from-deep-space to-background border-l border-primary/30 z-50 flex flex-col shadow-2xl"
          >
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b border-primary/20">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-gradient-to-br from-primary to-secondary rounded-lg flex items-center justify-center">
                  <ShoppingCart className="w-5 h-5 text-primary-foreground" />
                </div>
                <div>
                  <h2 className="font-heading text-2xl font-bold text-foreground">Your Cart</h2>
                  <p className="text-sm text-foreground/60">{itemCount} {itemCount === 1 ? 'item' : 'items'}</p>
                </div>
              </div>
              <button
                onClick={actions.closeCart}
                className="text-foreground/60 hover:text-foreground transition-colors"
                aria-label="Close cart"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            {/* Cart Items */}
            <div className="flex-1 overflow-y-auto p-6 space-y-4">
              {items.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-full text-center py-12">
                  <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center mb-4">
                    <ShoppingCart className="w-10 h-10 text-primary/50" />
                  </div>
                  <p className="text-foreground/60 text-lg mb-2">Your cart is empty</p>
                  <p className="text-foreground/40 text-sm">Add some plans to get started</p>
                </div>
              ) : (
                items.map((item) => (
                  <motion.div
                    key={item.id}
                    layout
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    className="bg-background/50 border border-primary/20 rounded-lg p-4 hover:border-primary/40 transition-colors"
                  >
                    <div className="flex gap-4">
                      {/* Item Image */}
                      {item.image && (
                        <div className="w-20 h-20 rounded-lg overflow-hidden bg-deep-space flex-shrink-0">
                          <Image
                            src={item.image}
                            alt={item.name}
                            className="w-full h-full object-cover"
                            width={80}
                          />
                        </div>
                      )}

                      {/* Item Details */}
                      <div className="flex-1 min-w-0">
                        <h3 className="font-heading font-bold text-foreground mb-1 truncate">
                          {item.name}
                        </h3>
                        <p className="text-primary font-semibold mb-3">
                          {formatPrice(item.price, currency ?? DEFAULT_CURRENCY)}
                          <span className="text-foreground/60 text-sm ml-1">/month</span>
                        </p>

                        {/* Quantity Controls */}
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <button
                              onClick={() => actions.updateQuantity(item, Math.max(1, item.quantity - 1))}
                              className="w-7 h-7 bg-primary/20 hover:bg-primary/30 text-primary rounded flex items-center justify-center transition-colors"
                              aria-label="Decrease quantity"
                            >
                              <Minus className="w-4 h-4" />
                            </button>
                            <span className="w-8 text-center font-semibold text-foreground">
                              {item.quantity}
                            </span>
                            <button
                              onClick={() => actions.updateQuantity(item, item.quantity + 1)}
                              className="w-7 h-7 bg-primary/20 hover:bg-primary/30 text-primary rounded flex items-center justify-center transition-colors"
                              aria-label="Increase quantity"
                            >
                              <Plus className="w-4 h-4" />
                            </button>
                          </div>

                          <button
                            onClick={() => actions.removeFromCart(item)}
                            className="text-destructive/70 hover:text-destructive transition-colors"
                            aria-label="Remove item"
                          >
                            <Trash2 className="w-5 h-5" />
                          </button>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))
              )}
            </div>

            {/* Footer */}
            {items.length > 0 && (
              <div className="border-t border-primary/20 p-6 space-y-4">
                {/* Total */}
                <div className="flex items-center justify-between mb-4">
                  <span className="font-heading text-lg font-bold text-foreground">Total</span>
                  <span className="font-heading text-2xl font-black text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary">
                    {formatPrice(totalPrice, currency ?? DEFAULT_CURRENCY)}
                  </span>
                </div>

                {/* Checkout Button */}
                <button
                  onClick={actions.checkout}
                  disabled={isCheckingOut}
                  className="w-full bg-gradient-to-r from-primary to-secondary hover:from-primary/90 hover:to-secondary/90 disabled:from-primary/50 disabled:to-secondary/50 text-primary-foreground font-bold py-4 rounded transition-all duration-300 shadow-lg shadow-primary/30 hover:shadow-primary/50 flex items-center justify-center gap-2"
                >
                  {isCheckingOut ? (
                    <>
                      <Loader2 className="w-5 h-5 animate-spin" />
                      Processing...
                    </>
                  ) : (
                    'Proceed to Checkout'
                  )}
                </button>

                {/* Clear Cart */}
                <button
                  onClick={actions.clearCart}
                  className="w-full text-foreground/60 hover:text-foreground text-sm py-2 transition-colors"
                >
                  Clear Cart
                </button>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
