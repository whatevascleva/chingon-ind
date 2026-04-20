import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Check, Loader2 } from 'lucide-react';
import { BaseCrudService, useCart, useCurrency, formatPrice, DEFAULT_CURRENCY } from '@/integrations';
import { SubscriptionPlans } from '@/entities';
import { Image } from '@/components/ui/image';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

export default function ServicesPage() {
  const [plans, setPlans] = useState<SubscriptionPlans[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const { addingItemId, actions } = useCart();
  const { currency } = useCurrency();

  useEffect(() => {
    loadPlans();
  }, []);

  const loadPlans = async () => {
    try {
      const result = await BaseCrudService.getAll<SubscriptionPlans>('subscriptionplans');
      setPlans(result.items);
    } catch (error) {
      console.error('Error loading plans:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleAddToCart = (plan: SubscriptionPlans) => {
    actions.addToCart({
      collectionId: 'subscriptionplans',
      itemId: plan._id,
      quantity: 1
    });
  };

  const parseFeatures = (features?: string): string[] => {
    if (!features) return [];
    return features.split('\n').filter(f => f.trim());
  };

  return (
    <div className="min-h-screen bg-background text-foreground font-paragraph">
      <Header />
      
      {/* Hero Section */}
      <section className="relative w-full pt-32 pb-20 px-8 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-deep-space via-background to-primary/10" />
        
        {/* Animated Grid */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute inset-0" style={{
            backgroundImage: 'linear-gradient(rgba(255, 107, 0, 0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255, 107, 0, 0.5) 1px, transparent 1px)',
            backgroundSize: '40px 40px'
          }} />
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="relative z-10 max-w-[100rem] mx-auto text-center"
        >
          <h1 className="font-heading text-6xl lg:text-8xl font-black text-transparent bg-clip-text bg-gradient-to-r from-primary via-secondary to-burnt-orange mb-6">
            SUBSCRIPTION PLANS
          </h1>
          <p className="text-xl lg:text-2xl text-foreground/80 max-w-3xl mx-auto">
            Choose the perfect plan to power your digital transformation
          </p>
        </motion.div>
      </section>

      {/* Plans Grid */}
      <section className="relative w-full py-20 px-8">
        <div className="max-w-[100rem] mx-auto min-h-[600px]">
          {isLoading ? null : plans.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {plans.map((plan, index) => (
                <motion.div
                  key={plan._id}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className="group relative bg-gradient-to-br from-deep-space to-background border border-primary/30 rounded-lg overflow-hidden hover:border-primary/60 transition-all duration-300"
                >
                  {/* Hover Glow Effect */}
                  <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  
                  <div className="relative z-10 p-8">
                    {/* Plan Image */}
                    {plan.itemImage && (
                      <div className="mb-6 rounded-lg overflow-hidden h-48 bg-deep-space">
                        <Image
                          src={plan.itemImage}
                          alt={plan.itemName || 'Subscription Plan'}
                          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                          width={400}
                        />
                      </div>
                    )}

                    {/* Plan Name */}
                    <h3 className="font-heading text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary mb-4">
                      {plan.itemName}
                    </h3>

                    {/* Price */}
                    <div className="mb-6">
                      <span className="font-heading text-5xl font-black text-foreground">
                        {formatPrice(plan.itemPrice || 0, currency ?? DEFAULT_CURRENCY)}
                      </span>
                      <span className="text-foreground/60 text-lg ml-2">/month</span>
                    </div>

                    {/* Description */}
                    {plan.itemDescription && (
                      <p className="text-foreground/70 mb-6 leading-relaxed">
                        {plan.itemDescription}
                      </p>
                    )}

                    {/* Features */}
                    {plan.keyFeatures && (
                      <div className="mb-8 space-y-3">
                        {parseFeatures(plan.keyFeatures).map((feature, idx) => (
                          <div key={idx} className="flex items-start gap-3">
                            <div className="w-5 h-5 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center flex-shrink-0 mt-0.5">
                              <Check className="w-3 h-3 text-primary-foreground" />
                            </div>
                            <span className="text-foreground/80 text-sm leading-relaxed">{feature}</span>
                          </div>
                        ))}
                      </div>
                    )}

                    {/* CTA Button */}
                    {plan.subscribeUrl ? (
                      <a
                        href={plan.subscribeUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="block w-full bg-primary hover:bg-primary/90 text-primary-foreground font-semibold py-4 rounded text-center transition-all duration-300 shadow-lg shadow-primary/30 hover:shadow-primary/50"
                      >
                        Subscribe Now
                      </a>
                    ) : (
                      <button
                        onClick={() => handleAddToCart(plan)}
                        disabled={addingItemId === plan._id}
                        className="w-full bg-primary hover:bg-primary/90 disabled:bg-primary/50 text-primary-foreground font-semibold py-4 rounded transition-all duration-300 shadow-lg shadow-primary/30 hover:shadow-primary/50 flex items-center justify-center gap-2"
                      >
                        {addingItemId === plan._id ? (
                          <>
                            <Loader2 className="w-5 h-5 animate-spin" />
                            Adding...
                          </>
                        ) : (
                          'Add to Cart'
                        )}
                      </button>
                    )}
                  </div>

                  {/* Bottom Accent */}
                  <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-primary via-secondary to-burnt-orange opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </motion.div>
              ))}
            </div>
          ) : (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-20"
            >
              <p className="text-xl text-foreground/60">No subscription plans available at the moment.</p>
            </motion.div>
          )}
        </div>
      </section>

      {/* Trust Section */}
      <section className="relative w-full py-20 px-8 bg-gradient-to-br from-primary/5 to-transparent">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="max-w-[100rem] mx-auto text-center"
        >
          <h2 className="font-heading text-4xl lg:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary mb-6">
            Enterprise-Grade Reliability
          </h2>
          <p className="text-lg text-foreground/70 max-w-3xl mx-auto mb-12">
            All plans include 99.9% uptime SLA, 24/7 support, and military-grade security protocols
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            {[
              { value: '99.9%', label: 'Uptime Guarantee' },
              { value: '24/7', label: 'Expert Support' },
              { value: '256-bit', label: 'Encryption' }
            ].map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-gradient-to-br from-deep-space to-background border border-primary/20 rounded-lg p-6"
              >
                <div className="font-heading text-4xl font-black text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary mb-2">
                  {stat.value}
                </div>
                <div className="text-foreground/70">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </section>

      <Footer />
    </div>
  );
}
