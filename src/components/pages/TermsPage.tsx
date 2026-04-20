import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FileText, Calendar, Shield } from 'lucide-react';
import { BaseCrudService } from '@/integrations';
import { TermsandPolicies } from '@/entities';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { format } from 'date-fns';

export default function TermsPage() {
  const [policies, setPolicies] = useState<TermsandPolicies[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedPolicy, setSelectedPolicy] = useState<TermsandPolicies | null>(null);

  useEffect(() => {
    loadPolicies();
  }, []);

  const loadPolicies = async () => {
    try {
      const result = await BaseCrudService.getAll<TermsandPolicies>('termsandpolicies');
      setPolicies(result.items);
      if (result.items.length > 0) {
        setSelectedPolicy(result.items[0]);
      }
    } catch (error) {
      console.error('Error loading policies:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const formatDate = (date?: Date | string) => {
    if (!date) return 'N/A';
    try {
      const dateObj = typeof date === 'string' ? new Date(date) : date;
      return format(dateObj, 'MMMM dd, yyyy');
    } catch {
      return 'N/A';
    }
  };

  const getPolicyIcon = (type?: string) => {
    switch (type?.toLowerCase()) {
      case 'privacy':
        return Shield;
      case 'terms':
        return FileText;
      default:
        return FileText;
    }
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
            TERMS & POLICIES
          </h1>
          <p className="text-xl lg:text-2xl text-foreground/80 max-w-3xl mx-auto">
            Transparency and trust are the foundation of our partnership
          </p>
        </motion.div>
      </section>

      {/* Content Section */}
      <section className="relative w-full py-20 px-8">
        <div className="max-w-[100rem] mx-auto min-h-[600px]">
          {isLoading ? null : policies.length > 0 ? (
            <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
              {/* Sidebar Navigation */}
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6 }}
                className="lg:col-span-1"
              >
                <div className="sticky top-32 space-y-3">
                  {policies.map((policy) => {
                    const Icon = getPolicyIcon(policy.policyType);
                    const isSelected = selectedPolicy?._id === policy._id;
                    
                    return (
                      <button
                        key={policy._id}
                        onClick={() => setSelectedPolicy(policy)}
                        className={`w-full text-left p-4 rounded-lg border transition-all duration-300 ${
                          isSelected
                            ? 'bg-gradient-to-br from-primary/20 to-secondary/20 border-primary'
                            : 'bg-deep-space border-primary/20 hover:border-primary/50'
                        }`}
                      >
                        <div className="flex items-start gap-3">
                          <div className={`w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0 ${
                            isSelected
                              ? 'bg-gradient-to-br from-primary to-secondary'
                              : 'bg-background'
                          }`}>
                            <Icon className={`w-5 h-5 ${
                              isSelected ? 'text-primary-foreground' : 'text-primary'
                            }`} />
                          </div>
                          <div className="flex-1 min-w-0">
                            <h3 className={`font-heading font-bold mb-1 ${
                              isSelected ? 'text-primary' : 'text-foreground'
                            }`}>
                              {policy.policyTitle}
                            </h3>
                            {policy.policyType && (
                              <p className="text-xs text-foreground/60 capitalize">
                                {policy.policyType}
                              </p>
                            )}
                          </div>
                        </div>
                      </button>
                    );
                  })}
                </div>
              </motion.div>

              {/* Main Content */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="lg:col-span-3"
              >
                {selectedPolicy && (
                  <div className="bg-gradient-to-br from-deep-space to-background border border-primary/30 rounded-lg p-8 lg:p-12">
                    {/* Header */}
                    <div className="mb-8 pb-8 border-b border-primary/20">
                      <h2 className="font-heading text-4xl lg:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary mb-6">
                        {selectedPolicy.policyTitle}
                      </h2>
                      
                      <div className="flex flex-wrap gap-6">
                        {selectedPolicy.effectiveDate && (
                          <div className="flex items-center gap-2 text-foreground/70">
                            <Calendar className="w-5 h-5 text-primary" />
                            <span className="text-sm">
                              Effective: {formatDate(selectedPolicy.effectiveDate)}
                            </span>
                          </div>
                        )}
                        
                        {selectedPolicy.lastUpdated && (
                          <div className="flex items-center gap-2 text-foreground/70">
                            <Calendar className="w-5 h-5 text-secondary" />
                            <span className="text-sm">
                              Updated: {formatDate(selectedPolicy.lastUpdated)}
                            </span>
                          </div>
                        )}
                        
                        {selectedPolicy.versionNumber && (
                          <div className="flex items-center gap-2">
                            <span className="px-3 py-1 bg-primary/20 text-primary text-xs font-semibold rounded-full">
                              Version {selectedPolicy.versionNumber}
                            </span>
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Content */}
                    <div className="prose prose-invert prose-lg max-w-none">
                      {selectedPolicy.policyContent ? (
                        <div className="text-foreground/80 leading-relaxed whitespace-pre-wrap">
                          {selectedPolicy.policyContent}
                        </div>
                      ) : (
                        <p className="text-foreground/60 italic">No content available for this policy.</p>
                      )}
                    </div>

                    {/* Footer Note */}
                    <div className="mt-12 pt-8 border-t border-primary/20">
                      <div className="bg-primary/10 border border-primary/30 rounded-lg p-6">
                        <div className="flex items-start gap-4">
                          <Shield className="w-6 h-6 text-primary flex-shrink-0 mt-1" />
                          <div>
                            <h4 className="font-heading font-bold text-foreground mb-2">
                              Questions or Concerns?
                            </h4>
                            <p className="text-foreground/70 text-sm leading-relaxed">
                              If you have any questions about our policies or need clarification on any terms, 
                              please don't hesitate to contact our legal team. We're committed to transparency 
                              and ensuring you understand how we protect your rights and data.
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </motion.div>
            </div>
          ) : (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-20"
            >
              <FileText className="w-16 h-16 text-primary/50 mx-auto mb-4" />
              <p className="text-xl text-foreground/60">No policies available at the moment.</p>
            </motion.div>
          )}
        </div>
      </section>

      {/* Trust Banner */}
      <section className="relative w-full py-16 px-8 bg-gradient-to-r from-primary/10 via-secondary/10 to-burnt-orange/10">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="max-w-[100rem] mx-auto text-center"
        >
          <Shield className="w-16 h-16 text-primary mx-auto mb-6" />
          <h3 className="font-heading text-3xl lg:text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary mb-4">
            Your Trust, Our Priority
          </h3>
          <p className="text-lg text-foreground/70 max-w-2xl mx-auto">
            We maintain the highest standards of transparency and compliance to ensure your data 
            and rights are always protected.
          </p>
        </motion.div>
      </section>

      <Footer />
    </div>
  );
}
